import React, { useState, useEffect } from 'react';
import '../Components/AdminDesign.css';
import Sidebar from './Functions/Sidebar.jsx';
import { Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { PRODUCTS_API_URL, CATEGORIES_API_URL } from '../../constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const years = [];

for (let i = 0; i < 124; i++) {
    years.push(2023 - i);
}

const doors = [];

for (let i = 0; i < 5; i++) {
    doors.push(i + 2);
}

const AdminCategories = () => {

    const [openDelete, setOpenDelete] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [newCategory, setNewCategory] = React.useState("")
    const [categoryToBeDeleted, setCategoryToBeDeleted] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(CATEGORIES_API_URL).then((response) => {
            setCategories(response.data)
            console.log("categories below:")
            console.log(response.data)
        })
        axios.get(PRODUCTS_API_URL).then((response) => {
            setProducts(response.data)
            console.log("products below:")
            console.log(response.data)
        })
    }, [])

    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    }

    const handleClickOpenDelete = (row) => {
        setCategoryToBeDeleted(row)
        setOpenDelete(true);
    }

    const handleClose = () => {
        setOpenDelete(false)
        setOpenAdd(false)
    }

    const handleChangeNewCategory = (e) => {
        console.log(e.target.value)
        setNewCategory(e.target.value)
    }

    const notify = (message) => toast.success(message)

    function refreshPage() {
        window.location.reload(true);
    }

    function postCategory() {
        axios.post(CATEGORIES_API_URL,
          {
            "category_id": Math.max(...categories.map(o => o.pk)) + 1,
            "category_name": newCategory
          })
        refreshPage()
      }
    
      function deleteCategory() {
        axios.delete(CATEGORIES_API_URL + categoryToBeDeleted + "/")
        refreshPage()
      }

    return (
        <div className='dashboard main-content'>
            <header className="page-header">
                <span className="page-title">View Your Categories</span>
            </header>
            <Sidebar />
            <div className='comments-container'>
                <Stack direction='column'>
                    <h3></h3>
                    <div className="add-new-category">
                        <button className="view-or-edit" onClick={handleClickOpenAdd}>
                            <FontAwesomeIcon icon={faPlus} /> &nbsp;
                            <span>
                                Add new category
                            </span>
                        </button>
                    </div>
                    <div className='table'>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: '600' }} align="center">Categories</TableCell>
                                        <TableCell style={{ fontWeight: '600' }} align="center">Number of products</TableCell>
                                        <TableCell style={{ fontWeight: '600' }} align="center">Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {categories.map((row) => (
                                        <TableRow
                                            key={row.pk}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" align="center">
                                                {row.category_name}
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="center">
                                                {products.filter(element => element.pcategory === row.category_id).length}
                                            </TableCell>
                                            <TableCell align="center">
                                                <FontAwesomeIcon
                                                    icon={faTrashCan}
                                                    className='x-mark'
                                                    onClick={() => { handleClickOpenDelete(row.pk) }} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Stack>
            </div>
            <Dialog
                className="dialog-popup"
                open={openDelete}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <span className='dialog-text'>
                        Are you sure you want to delete?
                    </span>
                </DialogTitle>
                <DialogActions>
                    <button className='dialog-button-no' onClick={handleClose}>NO</button>
                    <button className='dialog-button-yes' onClick={() => deleteCategory() }>YES</button>
                </DialogActions>
            </Dialog>
            <Dialog open={openAdd} onClose={handleClose}
                BackdropProps={{ style: { backgroundColor: "rgba(64, 64, 64, 0.2)" } }}
                PaperProps={{ sx: { width: "50%", maxHeight: "70%" } }}
            >
                <DialogTitle>Type the category you want to add.</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="newCategory"
                        label="New Category..."
                        type="category"
                        fullWidth
                        variant="standard"
                        value={newCategory}
                        onChange={handleChangeNewCategory}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => { postCategory() }}>Okay</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminCategories;