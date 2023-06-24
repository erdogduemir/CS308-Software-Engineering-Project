import React, { useState, useEffect } from 'react';
import '../Components/AdminDesign.css';
import Sidebar from './Functions/Sidebar.jsx';
import { Stack, ToggleButtonGroup, ToggleButton } from '@mui/material';
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
import { useNavigate, useParams } from 'react-router-dom'
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

const ProductPriceDiscount = () => {

    const [openCancel, setOpenCancel] = useState(false);
    const [openDone, setOpenDone] = useState(false);
    const [product, setProduct] = useState([])
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [isDiscount, setIsDiscount] = useState(false)

    const navigate = useNavigate()

    const { pk_and_pname } = useParams()

    useEffect(() => {
        const pk_of_product = pk_and_pname.substring(0, pk_and_pname.indexOf('-'))
        axios.get(PRODUCTS_API_URL + pk_of_product + "/").then((response) => {
            setProduct(response.data)
            console.log("product below:")
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

    const handleChangePrice = (e) => {
        console.log(e.target.value)
        setPrice(e.target.value)
    }

    const handleChangeDiscount = (e) => {
        console.log(e.target.value)
        setDiscount(e.target.value)
    }

    const handleIsDiscount = (event, newIsDiscount) => {
        setIsDiscount(newIsDiscount)
        console.log("is discount?: " + newIsDiscount)
    }

    const notify = (message) => toast.success(message)

    axios.defaults.headers.put['Authorization'] = `JWT ${localStorage.getItem('access')}`;

    function updateProduct() {
        if (isDiscount) {
            axios.put(PRODUCTS_API_URL + product.pk + "/",
                {
                    'pid': product.pid,
                    'pname': product.pname,
                    'pmodel': product.pmodel,
                    'pnumber': product.pnumber,
                    'pdescription': product.pdescription,
                    'prating': product.prating,
                    'pstock': product.pstock,
                    'pprice': product.pprice,
                    'pwarranty': product.pwarranty,
                    'pdistinfo': product.pdistinfo,
                    'pcategory': product.pcategory,
                    'ppopularity': product.ppopularity,
                    'psales_discount': discount
                }
            )
        } else {
            axios.put(PRODUCTS_API_URL + product.pk + "/",
                {
                    'pid': product.pid,
                    'pname': product.pname,
                    'pmodel': product.pmodel,
                    'pnumber': product.pnumber,
                    'pdescription': product.pdescription,
                    'prating': product.prating,
                    'pstock': product.pstock,
                    'pprice': price,
                    'pwarranty': product.pwarranty,
                    'pdistinfo': product.pdistinfo,
                    'pcategory': product.pcategory,
                    'ppopularity': product.ppopularity,
                    'psales_discount': product.psales_discount
                }
            )
        }
        notify("Price is successfully updated!")
        setTimeout(() => {
            navigate('../admin/products')
        }, 3000)
    }

    return (
        <div className='dashboard main-content'>
            <header className="page-header">
                <span className="page-title">Price and Discount</span>
            </header>
            <Sidebar />
            <div className="products-container">
                <Stack direction="column">
                    <ToggleButtonGroup
                        exclusive
                        value={isDiscount}
                        aria-label="is-discount"
                        onChange={handleIsDiscount}
                        fullWidth
                        sx={{ marginBottom: '10px' }}
                    >
                        <ToggleButton value={false} aria-label="left aligned" color='primary'>
                            <span style={{ fontSize: '14px' }}>Set the Price</span>
                        </ToggleButton>
                        <ToggleButton value={true} aria-label="centered" color='primary'>
                            <span style={{ fontSize: '14px' }}>Set the Discount</span>
                        </ToggleButton>
                    </ToggleButtonGroup>
                    {isDiscount
                        ? <div className='price-and-discount-card'>
                            <Stack direction="column" spacing="20px">
                                <Stack direction='row'>
                                    <p>Discount:</p>
                                    &nbsp;&nbsp;
                                    <TextField id="standard-basic" label="in percentage" variant="standard" size="small" value={discount} onChange={handleChangeDiscount}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">%</InputAdornment>,
                                        }} />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <p>Updated price will be:</p>
                                    &nbsp;&nbsp;
                                    <span style={{ marginTop: '16px' }}>${product.pprice * (1 - discount / 100)}</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </Stack>
                            </Stack>
                        </div>
                        : <div className='price-and-discount-card'>
                            <Stack direction="column" spacing="20px">
                                <Stack direction='row'>
                                    <p>Price:</p>
                                    &nbsp;&nbsp;
                                    <TextField id="standard-basic" label="in USD" variant="standard" size="small" value={price} onChange={handleChangePrice}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                    />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <p>Previous price:</p>
                                    &nbsp;&nbsp;
                                    <span style={{ marginTop: '16px' }}>${product.pprice}</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </Stack>
                            </Stack>
                        </div>
                    }
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
                        Are you sure you want to apply?
                    </span>
                </DialogTitle>
                <DialogActions>
                    <button className='dialog-button-yes' onClick={handleClose}>NO</button>
                    <button className='dialog-button-no' onClick={() => updateProduct()}>YES</button>
                </DialogActions>
            </Dialog>
            <ToastContainer
                autoClose={2000}
            />
        </div>
    );
};

export default ProductPriceDiscount;