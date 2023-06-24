import React, { useEffect, useState } from "react";
import '../../Components/AdminDesign.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { PRODUCTS_API_URL, CATEGORIES_API_URL } from "../../../constants";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProductCard = ({ product, is_superuser }) => {

    const [categories, setCategories] = useState([])
    const [open, setOpen] = useState(false);
    const [editStock, setEditStock] = useState(false)
    const [newStock, setNewStock] = useState(0)

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setEditStock(false)
    }

    const handleEditStock = () => {
        setEditStock(true)
    }

    // Calculate the number of yellow stars
    const yellowStars = Math.floor(product.prating);
    // Calculate the number of gray stars
    const grayStars = 5 - yellowStars;
    // Create an array of stars with the correct colors
    const stars = [...Array(yellowStars).fill(faStar), ...Array(grayStars).fill("")];

    function refreshPage() {
        window.location.reload(true);
    }

    useEffect(() => {
        axios.get(CATEGORIES_API_URL).then((response) => {
            setCategories(response.data)
            console.log("categories below:")
            console.log(response.data)
        })
    }, [])

    function deleteProduct() {
        axios.delete(PRODUCTS_API_URL + product.pk + "/")
        refreshPage()
    }

    const handleChangeNewStock = (e) => {
        console.log(e.target.value)
        setNewStock(e.target.value)
    }

    function updateStock() {
        axios.put(PRODUCTS_API_URL + product.pk + "/",
            {
                'pk': product.pk,
                'pid': product.pid,
                'pname': product.pname,
                'pmodel': product.pmodel,
                'pnumber': product.pnumber,
                'pdescription': product.pdescription,
                'pstock': newStock,
                'pprice': product.pprice,
                'pwarranty': product.pwarranty,
                'pdistinfo': product.pdistinfo,
                'pcategory': product.pcategory,
                'ppopularity': product.ppopularity,
                'psales_discount': product.psales_discount
            }
        )
        refreshPage()
    }

    return (
        <div className="product-card">
            <div className="product-image">
                <img src={product.pimage} alt={product.pname} />
            </div>
            <div className="product-details">
                <h2 className="product-name">
                    <span style={{ fontWeight: 'bold' }}>{product.pname}</span>&nbsp;
                    [{categories.filter(c => c.category_id === product.pcategory).map((cat) => (
                        cat.category_name
                    ))}]
                </h2>
                {product.psales_discount > 0
                    ? <p className="product-price">
                        ${product.pprice * (1 - product.psales_discount / 100)} &nbsp;&nbsp;&nbsp;
                        <span style={{color:'#CCCCCC', textDecoration: 'line-through'}}>${product.pprice}</span>
                    </p>
                    : <p className="product-price">${product.pprice}</p>
                }
                <div className="product-rating">{stars.map((star, i) => {
                    const starColor = i + 1 <= product.prating ? "#FFD700" : "#CCCCCC";
                    return <FontAwesomeIcon icon={faStar} style={{ color: starColor }} key={i}></FontAwesomeIcon>;
                })}
                </div>
            </div>
            {is_superuser
                ? <div className="button-container">
                    {product.pstock > 0
                        ? <span style={{ marginBottom: '8px' }} >Stock: {product.pstock} &nbsp;&nbsp;&nbsp;&nbsp; </span>
                        : <span style={{ marginBottom: '8px', fontWeight: 'bold', color: '#2f66b6' }}>Out of stock! &nbsp;&nbsp;&nbsp;&nbsp; </span>
                    }
                    <button className="view-or-edit" onClick={handleEditStock}>Edit stock</button>
                    <button className="delete" onClick={handleClickOpen}>Delete</button>
                </div>
                : <div className="button-container">
                    <Link className="view-or-edit"
                        to={"../admin/products/" + product.pk + "-" + product.pname}
                    >
                        Edit price and discount
                    </Link>
                </div>
            }
            <Dialog
                className="dialog-popup"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <span className='dialog-text'>
                        Are you sure you want to delete the product?
                    </span>
                </DialogTitle>
                <DialogActions>
                    <button className='dialog-button-no' onClick={handleClose}>NO</button>
                    <button className='dialog-button-yes' onClick={() => deleteProduct()}>YES</button>
                </DialogActions>
            </Dialog>
            <Dialog open={editStock} onClose={handleClose}
                BackdropProps={{ style: { backgroundColor: "rgba(64, 64, 64, 0.2)" } }}
                PaperProps={{ sx: { width: "50%", maxHeight: "70%" } }}
            >
                <DialogTitle>Edit the stock.</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="edit_stock"
                        label="Stock..."
                        type="stock"
                        fullWidth
                        variant="standard"
                        value={newStock}
                        onChange={handleChangeNewStock}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => { updateStock() }}>Okay</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ProductCard;