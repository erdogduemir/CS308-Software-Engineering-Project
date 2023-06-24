import React, { useEffect, useState } from 'react';
import '../Components/AdminDesign.css';
import Sidebar from './Functions/Sidebar.jsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, faBoxesPacking, faTruckArrowRight } from "@fortawesome/free-solid-svg-icons";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Stack } from '@mui/material';
import Slide from '@mui/material/Slide';
import { PRODUCTS_API_URL, ORDERS_API_URL, CUSTOMERS_API_URL } from '../../constants';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AdminRequestsPage() {

    const [post, setPost] = useState([])
    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState({})
    const [selectedProduct, setSelectedProduct] = useState({})
    const [customers, setCustomers] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState({})

    function refreshPage() {
        window.location.reload(true);
    }

    useEffect(() => {
        axios.get(ORDERS_API_URL).then((response) => {
            setPost(response.data)
            console.log("orders below:")
            console.log(response.data)
        })
        axios.get(PRODUCTS_API_URL).then((response) => {
            setProducts(response.data)
            console.log("products below:")
            console.log(response.data)
        })
        axios.get(CUSTOMERS_API_URL).then((response) => {
            setCustomers(response.data)
            console.log("customers below:")
            console.log(response.data)
        })
    }, [])

    const handleOpen = (row) => {
        setSelectedOrder(row)
        setSelectedProduct(products[products.findIndex(element => element.pk.toString() === row.return_requested_items)])
        console.log("selected product: " + products[products.findIndex(element => element.pk.toString() === row.return_requested_items)].pk)
        setSelectedCustomer(customers[customers.findIndex(element => element.pk.toString() === row.customer.toString())])
        console.log("selected customer: " + customers[customers.findIndex(element => element.pk.toString() === row.customer.toString())].pk)
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const notify = (message) => toast.success(message)

    function updateRefund() {
        axios.put(PRODUCTS_API_URL + selectedProduct.pk + "/",
            {
                'pid': selectedProduct.pid,
                'pname': selectedProduct.pname,
                'pmodel': selectedProduct.pmodel,
                'pnumber': selectedProduct.pnumber,
                'pdescription': selectedProduct.pdescription,
                'prating': selectedProduct.prating,
                'pstock': selectedProduct.pstock + 1,
                'pprice': selectedProduct.pprice,
                'pwarranty': selectedProduct.pwarranty,
                'pdistinfo': selectedProduct.pdistinfo,
                'pcategory': selectedProduct.pcategory,
                'ppopularity': selectedProduct.ppopularity,
                'psales_discount': selectedProduct.psales_discount
            }
        )
        axios.put(ORDERS_API_URL + selectedOrder.pk + "/",
            {
                "pk": selectedOrder.pk,
                "all_products": selectedOrder.all_products,
                "customer": selectedOrder.customer,
                "address": selectedOrder.address,
                "isSentToDelivery": selectedOrder.isSentToDelivery,
                "order_date": selectedOrder.order_date,
                "status": selectedOrder.status,
                "total_cost": selectedOrder.total_cost,
                "all_costs": selectedOrder.all_costs,
                "total_product": selectedOrder.total_product,
                "refunded_items": selectedOrder.refunded_items === "" ? selectedOrder.return_requested_items : selectedOrder.refunded_items + "," + selectedOrder.return_requested_items,
                "return_requested_items": ""
            }
        )
        notify("Refund is successful! Payback will be done to the customer's account.")
        setTimeout(() => {
            refreshPage()
        }, 3000)
    }

    return (
        <div className="dashboard main-content">
            <header className="page-header">
                <span className="page-title">Refund Requests</span>
            </header>
            <Sidebar />
            <div className='comments-container'>
                <Stack direction='column'>
                    <h3></h3>
                    <div className='requests-table'>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: '600' }} align="center">Delivery pk</TableCell>
                                        <TableCell style={{ fontWeight: '600' }} align="center">Customer pk</TableCell>
                                        <TableCell style={{ fontWeight: '600' }} align="center">Product(s) pk</TableCell>
                                        <TableCell style={{ fontWeight: '600' }} align="center">Quantity</TableCell>
                                        <TableCell style={{ fontWeight: '600' }} align="center">Total Price</TableCell>
                                        <TableCell style={{ fontWeight: '600' }} align="left">Address</TableCell>
                                        <TableCell style={{ fontWeight: '600' }} align="center">Date</TableCell>
                                        <TableCell style={{ fontWeight: '600' }} align="center">Requested Products</TableCell>
                                        <TableCell style={{ fontWeight: '600' }} align="center">Accept or Reject</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {post.slice(0).reverse().map((row) => (
                                        row.return_requested_items != ""
                                            ? <TableRow
                                                key={row.pk}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" align="center" style={{ width: '5vw' }}>
                                                    {row.pk}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="center" style={{ width: '5vw' }}>
                                                    {row.customer}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="center" style={{ width: '5vw' }}>
                                                    {row.all_products}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="center" style={{ width: '5vw' }}>
                                                    {row.total_product}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="center">
                                                    ${Math.round(row.total_cost).toLocaleString()}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="left"
                                                    style={{ width: '200px' }}
                                                >
                                                    {row.address}
                                                </TableCell>
                                                <TableCell align="center">{row.order_date}</TableCell>
                                                <TableCell component="th" scope="row" align="center" style={{ width: '5vw' }}>
                                                    {row.return_requested_items}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="center" style={{ width: '5vw' }}>
                                                    <button className='view-or-edit' onClick={() => { handleOpen(row) }}>View</button>
                                                </TableCell>
                                            </TableRow>
                                            : null
                                    ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Stack>
            </div>
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
                        Are you sure you want to approve the request and refund the money?
                        Total amount will be transferred to the customer's account.
                        Stock will be increased.
                    </span>
                </DialogTitle>
                <DialogActions>
                    <button className='dialog-button-yes' onClick={handleClose}>NO</button>
                    <button className='dialog-button-no' onClick={() => updateRefund()}>YES</button>
                </DialogActions>
            </Dialog>
            <ToastContainer
                autoClose={2000}
            />
        </div>
    );
}