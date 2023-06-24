import React, { useState, useEffect } from 'react';
import '../Components/AdminDesign.css';
import Sidebar from './Functions/Sidebar.jsx';
import { Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { PRODUCTS_API_URL, CATEGORIES_API_URL } from '../../constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

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

const AddProduct = () => {

    const [openCancel, setOpenCancel] = useState(false);
    const [openDone, setOpenDone] = useState(false);
    const [products, setProducts] = useState([])
    const [name, setName] = useState("")
    const [yearSelected, setYear] = useState()
    const [doorSelected, setDoors] = useState()
    const [categories, setCategories] = useState([])
    const [categorySelected, setCategorySelected] = useState()
    const [stock, setStock] = useState()
    const [image, setImage] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [discount, setDiscount] = useState()
    const [distributor, setDistributor] = useState()
    const [warranty, setWarranty] = useState()

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

    const handleClickOpenCancel = () => {
        setOpenCancel(true);
    }

    const handleClickOpenDone = () => {
        setOpenDone(true);
    }

    const handleClose = () => {
        setOpenCancel(false)
        setOpenDone(false)
    }

    const handleChangeName = (e) => {
        console.log(e.target.value)
        setName(e.target.value)
    }

    const handleChangeModel = (e) => {
        console.log(e.target.value)
        setYear(e.target.value)
    }

    const handleChangeDoors = (e) => {
        console.log(e.target.value)
        setDoors(e.target.value)
    }

    const handleChangeCategory = (e) => {
        console.log(e.target.value)
        setCategorySelected(e.target.value)
    }

    const handleChangeStock = (e) => {
        console.log(e.target.value)
        setStock(e.target.value)
    }

    const handleChangeImage = (e) => {
        console.log(e.target.value)
        setImage(e.target.value)
    }

    const handleChangeDescription = (e) => {
        console.log(e.target.value)
        setDescription(e.target.value)
    }

    const handleChangePrice = (e) => {
        console.log(e.target.value)
        setPrice(e.target.value)
    }

    const handleChangeDiscount = (e) => {
        console.log(e.target.value)
        setDiscount(e.target.value)
    }

    const handleChangeDistributor = (e) => {
        console.log(e.target.value)
        setDistributor(e.target.value)
    }

    const handleChangeWarranty = (e) => {
        console.log(e.target.value)
        setWarranty(e.target.value)
    }

    function postProduct() {
        axios.post(PRODUCTS_API_URL,
            {
                'pid': Math.max(...products.map(o => o.pk)) + 1,
                'pname': name,
                'pmodel': yearSelected,
                'pnumber': doorSelected,
                'pdescription': description,
                'prating': 0.0,
                'pimage': image,
                'pstock': stock,
                'pprice': price,
                'pwarranty': warranty,
                'pdistinfo': distributor,
                'pcategory': categorySelected,
                'ppopularity': 0,
                'psales_discount': discount
            }
        )
        navigate('../admin/products')
    }

    return (
        <div className='dashboard main-content'>
            <header className="page-header">
                <span className="page-title">Add New Product</span>
            </header>
            <Sidebar />
            <div className="products-container">
                <Stack direction="column">
                    <div className='add-product-card'>
                        <Stack direction="column" spacing="20px">
                            <Stack direction="row">
                                <p>Name:</p>
                                &nbsp;&nbsp;
                                <TextField id="standard-basic" label="Car" variant="standard" size="small" value={name} onChange={handleChangeName} />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <p>Model:</p>
                                &nbsp;&nbsp;
                                <TextField
                                    id="standard-select-year"
                                    select
                                    label="year"
                                    helperText="Please select year"
                                    variant="standard"
                                    size="small"
                                    value={yearSelected}
                                    onChange={handleChangeModel}
                                >
                                    {years.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <p>Doors:</p>
                                &nbsp;&nbsp;
                                <TextField
                                    id="standard-select-door"
                                    select
                                    label="in numbers"
                                    helperText="Please select doors"
                                    variant="standard"
                                    size="small"
                                    value={doorSelected}
                                    onChange={handleChangeDoors}
                                >
                                    {doors.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Stack>
                            <Stack direction="row">
                                <p>Category:</p>
                                &nbsp;&nbsp;
                                <TextField
                                    id="standard-select-category"
                                    select
                                    label="Category"
                                    helperText="Please select a category"
                                    variant="standard"
                                    size="small"
                                    value={categorySelected}
                                    onChange={handleChangeCategory}
                                >
                                    {categories.map((option) => (
                                        <MenuItem key={option.pk} value={option.pk}>
                                            {option.category_name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <p>Stock:</p>
                                &nbsp;&nbsp;
                                <TextField id="standard-basic" label="in numbers" variant="standard" size="small" value={stock} onChange={handleChangeStock} />
                            </Stack>
                            <Stack direction="row">
                                <p>Image:</p>
                                &nbsp;&nbsp;
                                <TextField id="standard-basic" label="Put the URL here..." variant="standard" size="small" value={image} onChange={handleChangeImage} fullWidth />
                            </Stack>
                            <Stack direction="row">
                                <p>Description:</p>
                                &nbsp;&nbsp;
                                <TextField id="standard-basic" label="Describe the product..." variant="standard" size="small" value={description} onChange={handleChangeDescription} fullWidth />
                            </Stack>
                            <Stack direction="row">
                                <p>Price:</p>
                                &nbsp;&nbsp;
                                <TextField id="standard-basic" label="in USD" variant="standard" size="small" value={price} onChange={handleChangePrice}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }} />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <p>Discount:</p>
                                &nbsp;&nbsp;
                                <TextField id="standard-basic" label="in percentage" variant="standard" size="small" value={discount} onChange={handleChangeDiscount}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }} />
                            </Stack>
                            <Stack direction="row">
                                <p>Distributor:</p>
                                &nbsp;&nbsp;
                                <TextField id="standard-basic" label="e.g., Toyota" variant="standard" size="small" value={distributor} onChange={handleChangeDistributor} />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <p>Warranty:</p>
                                &nbsp;&nbsp;
                                <TextField id="standard-basic" label="e.g., 2 years" variant="standard" size="small" value={warranty} onChange={handleChangeWarranty} />
                            </Stack>
                        </Stack>
                    </div>
                    <Stack direction="row" spacing="2vw" justifyContent="flex-end">
                        <button className="add-product-cancel-button"
                            onClick={() => { handleClickOpenCancel() }}
                        >
                            <FontAwesomeIcon icon={faXmark} color='white' />
                        </button>
                        <button className="add-product-done-button"
                            onClick={() => { handleClickOpenDone() }}
                        >
                            <FontAwesomeIcon icon={faCheck} color='white' />
                        </button>
                    </Stack>
                </Stack>
            </div>
            <Dialog
                className="dialog-popup"
                open={openCancel}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <span className='dialog-text'>
                        Are you sure you want to cancel and return back?
                    </span>
                </DialogTitle>
                <DialogActions>
                    <button className='dialog-button-no' onClick={handleClose}>NO</button>
                    <button className='dialog-button-yes' onClick={() => navigate('../admin/products')}>YES</button>
                </DialogActions>
            </Dialog>
            <Dialog
                className="dialog-popup"
                open={openDone}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <span className='dialog-text'>
                        Are you sure you want to add the product?
                    </span>
                </DialogTitle>
                <DialogActions>
                    <button className='dialog-button-yes' onClick={handleClose}>NO</button>
                    <button className='dialog-button-no' onClick={() => postProduct()}>YES</button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddProduct;