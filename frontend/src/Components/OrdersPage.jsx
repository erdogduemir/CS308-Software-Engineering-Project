import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import '../App.css'
import '../constants/Navbar.css';
import '../constants/Footer.css';
import Navbar from './Navbar'
import React, { useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import '../constants/StarRating.css';
import '../constants/shoppingcard.css';
import { CartContext } from '../constants/CartContext';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { AUTH_USERS_ME, COMMENTS_API_URL, ORDERS_API_URL, PRODUCTS_API_URL, RATINGS_API_URL } from '../constants';
import axios from 'axios'
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {
  const year = new Date().getFullYear();
  return <footer>{`Copyright © CS308 Team 9 ${year}`}</footer>;
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Orders({ isAuthenticated }) {

  function refreshPage() {
    setTimeout(() => {
      window.location.reload(true);
    }, 3000)
  }

  const [openRefund, setOpenRefund] = React.useState(false)
  const [openCancel, setOpenCancel] = React.useState(false)
  const [openComment, setOpenComment] = React.useState(false);
  const [commentText, setCommentText] = React.useState("")
  const [openRating, setOpenRating] = React.useState(false);
  const [ratingInt, setRatingInt] = React.useState(0)
  const [product, setProduct] = React.useState()
  const [order, setOrder] = React.useState()
  const currentDate = new Date().toLocaleDateString('en-GB')

  const handleClickOpenRefund = (sub_row, row) => {
    setOpenRefund(true);
    setProduct(sub_row)
    setOrder(row)
  };

  const handleClickOpenCancel = (sub_row, row) => {
    setOpenCancel(true);
    setProduct(sub_row)
    setOrder(row)
  };

  const handleCloseCancel = () => {
    setOpenCancel(false);
    setOpenRefund(false);
  };

  const handleClickOpenComment = (sub_row, row) => {
    setOpenComment(true);
    setProduct(sub_row)
    setOrder(row)
  };

  const handleClickOpenRating = (sub_row, row) => {
    setOpenRating(true)
    setProduct(sub_row)
    setOrder(row)
  }

  const notify = (message) => toast.success(message)

  function cancelProduct() {
    axios.put(ORDERS_API_URL + order.pk + '/',
      {
        "pk": order.pk,
        "all_products": order.all_products,
        "customer": order.customer,
        "address": order.address,
        "isSentToDelivery": order.isSentToDelivery,
        "order_date": order.order_date,
        "status": order.status,
        "total_cost": order.total_cost,
        "all_costs": order.all_costs,
        "total_product": order.total_product,
        "refunded_items": order.refunded_items === "" ? product.pk : order.refunded_items + "," + product.pk,
        "return_requested_items": order.return_requested_items
      })
    notify("Your money will be sent to your account in 30 days!")
    setOpenCancel(false);
    refreshPage()
  }

  function refundProduct() {
    axios.put(ORDERS_API_URL + order.pk + '/',
      {
        "pk": order.pk,
        "all_products": order.all_products,
        "customer": order.customer,
        "address": order.address,
        "isSentToDelivery": order.isSentToDelivery,
        "order_date": order.order_date,
        "status": order.status,
        "total_cost": order.total_cost,
        "all_costs": order.all_costs,
        "total_product": order.total_product,
        "refunded_items": order.refunded_items,
        "return_requested_items": order.return_requested_items === "" ? product.pk : order.return_requested_items + "," + product.pk,
      })
    notify("Return request has been created and sent!")
    setOpenCancel(false);
    refreshPage()
  }

  function postRating() {
    axios.post(RATINGS_API_URL, {
      "rproduct": product.pk,
      "rcustomer": order.customer,
      "rstars": ratingInt,
      "rcreated_date": new Date().toLocaleDateString()
    })
    axios.put(PRODUCTS_API_URL + product.pk + "/",
      {
        'pk': product.pk,
        'pid': product.pid,
        'pname': product.pname,
        'pmodel': product.pmodel,
        'pnumber': product.pnumber,
        'pdescription': product.pdescription,
        'prating': product.prating === 0 ? ratingInt : (product.prating + ratingInt) / 2,
        'pstock': product.pstock,
        'pprice': product.pprice,
        'pwarranty': product.pwarranty,
        'pdistinfo': product.pdistinfo,
        'pcategory': product.pcategory,
        'ppopularity': product.ppopularity,
        'psales_discount': product.psales_discount
      }
    )
    setOpenRating(false);
  }

  function postComment() {
    axios.post(COMMENTS_API_URL, {
      "cproduct": product.pk,
      "ccustomer": order.customer,
      "ctext": commentText,
      "ccreated_date": new Date().toLocaleDateString(),
      "c_is_approved": false
    })
    setOpenComment(false);
  }

  const handleCloseComment = () => {
    setOpenComment(false);
  };

  const handleCloseRating = () => {
    setOpenRating(false);
  };

  const handleChangeComment = (e) => {
    console.log(e.target.value)
    setCommentText(e.target.value)
  }

  const handleChangeRating = (e) => {
    console.log(e.target.value)
    setRatingInt(e.target.value)
  }

  const stars = [...Array(5).fill(faStar)];
  const cart = useContext(CartContext)

  const [userInfo, setUserInfo] = useState()
  const [orders, setOrders] = useState()
  const [products, setProducts] = useState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Accept': 'application/json'
    }
  }

  useEffect(() => {
    axios.get(AUTH_USERS_ME, config).then((response) => {
      setUserInfo(response.data)
      console.log(response.data)
    })
    axios.get(ORDERS_API_URL).then((response) => {
      setOrders(response.data)
      console.log(response.data)
    })
    axios.get(PRODUCTS_API_URL).then((response) => {
      setProducts(response.data)
      console.log(response.data)
    })
  }, [])

  function isThirtyDays(row) {
    return row.order_date.slice(-3) === currentDate.slice(-3) &&
    ((parseInt(currentDate.slice(3,5)) * 30) + parseInt(currentDate.slice(0,2))) -
    ((parseInt(row.order_date.slice(3,5)) * 30) + parseInt(row.order_date.slice(0,2))) > 30
  }

  return (
    <div className="orders-page">
      <div>
        <Navbar />
        <div className='orders'>
          <h1 style={{ paddingLeft: "20px", marginBottom: "0px" }}>My Orders</h1>
          {orders?.slice(0).reverse().map((row) => (
            <div className='order-history-container'>
              <Stack direction='column'>
                <Stack direction="row" style={{ fontWeight: '600' }}>
                  <p>
                    Order dated {row.order_date}
                  </p>
                  &nbsp;&nbsp;&nbsp;
                  <p style={{ float: 'right' }}>
                    ------
                  </p>
                  &nbsp;&nbsp;&nbsp;
                  <p style={{ float: 'right' }}>
                    Total purchased products: {row.total_product}
                  </p>
                </Stack>
                {products?.map((sub_row) => (
                  row.all_products.includes(sub_row.pk)
                    ? <Stack direction='row'>
                      <Stack direction='row' spacing='120px' whiteSpace='nowrap' className='order-detail-container'>
                        <img src={sub_row.pimage} alt={sub_row.pname} />
                        <div style={{ flex: 1 }}>
                          <h3>{sub_row.pname}</h3>
                          <p>Model: {sub_row.pmodel}</p>
                          <span style={{ color: '#2f66d6' }} >${sub_row.pprice}</span>
                          <div style={{ padding: '8px' }}>
                            {stars.map((star, i) => {
                              const starColor = i + 1 <= sub_row.prating ? "#FFD700" : "#CCCCCC"
                              return <FontAwesomeIcon icon={faStar} style={{ color: starColor, scale: '1.2' }} key={i}></FontAwesomeIcon>
                            })}
                          </div>
                        </div>
                        <div>
                          <p>Delivery status: <span style={{ fontWeight: '400', color: '#2f66d6' }}>{row.status}</span></p>
                        </div>
                        <Stack direction='column' style={{ padding: '40px' }}>
                          <button
                            className='comment-rating-button'
                            style={{ color: row.status != "delivered" ? "gray" : '#2f66d6' }}
                            onClick={() => { handleClickOpenComment(sub_row, row) }}
                            disabled={row.status != "delivered"}
                          >
                            Add comment
                          </button>
                          <button
                            className='comment-rating-button'
                            style={{ color: row.status != "delivered" ? "gray" : '#2f66d6' }}
                            onClick={() => { handleClickOpenRating(sub_row, row) }}
                            disabled={row.status != "delivered"}
                          >
                            Add rating
                          </button>
                          {row.status != "delivered"
                            ? <button
                              className='refund-button'
                              style={{
                                color: row.refunded_items.includes(sub_row.pk) ? 'gray' : '#ff3232',
                                backgroundColor: row.refunded_items.includes(sub_row.pk) ? '#dddddd' : 'ff323222'
                              }}
                              onClick={() => { handleClickOpenCancel(sub_row, row) }}
                              disabled={row.refunded_items.includes(sub_row.pk)}
                            >
                              {row.refunded_items.includes(sub_row.pk) ? "Order canceled" : "Cancel the order"}
                            </button>
                            : <button
                              className='refund-button'
                              style={{
                                color: row.refunded_items.includes(sub_row.pk) || row.return_requested_items.includes(sub_row.pk) || isThirtyDays(row)
                                ? 'gray' : '#ff3232',
                                backgroundColor: row.refunded_items.includes(sub_row.pk) || row.return_requested_items.includes(sub_row.pk) || isThirtyDays(row)
                                ? '#dddddd' : 'ff323222'
                              }}
                              onClick={() => { handleClickOpenRefund(sub_row, row) }}
                              disabled={row.refunded_items.includes(sub_row.pk)}
                            >
                              {row.refunded_items.includes(sub_row.pk)
                              ? "Refunded" : ( isThirtyDays(row)
                              ? "Unavailable" : "Return and refund"
                              )}
                            </button>
                          }
                          { isThirtyDays(row)
                          ? <p style={{color:'#444444', marginTop:'5px'}}>Orders cannot be returned <br/> after 30 days.</p>
                          : (row.return_requested_items.includes(sub_row.pk)
                          ? <p style={{color:'#444444', marginTop:'5px'}}>Return has been requested.</p> : "")
                          }
                        </Stack>
                      </Stack>
                      <Dialog open={openComment} onClose={handleCloseComment}
                        BackdropProps={{ style: { backgroundColor: "rgba(64, 64, 64, 0.2)" } }}
                        PaperProps={{ sx: { width: "50%", maxHeight: "70%" } }}
                      >
                        <DialogTitle>Comment for {product ? product.pname : null}</DialogTitle>
                        <DialogContent>
                          <DialogContentText paddingBottom='40px'>
                            Leave your comment here.
                          </DialogContentText>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="comment"
                            label="Write your experience... Would you recommend?"
                            type="comment"
                            fullWidth
                            variant="standard"
                            value={commentText}
                            onChange={handleChangeComment}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseComment}>Cancel</Button>
                          <Button onClick={() => { postComment() }}>Okay</Button>
                        </DialogActions>
                      </Dialog>
                      <Dialog open={openRating} onClose={handleCloseRating}
                        BackdropProps={{ style: { backgroundColor: "rgba(64, 64, 64, 0.2)" } }}
                        PaperProps={{ sx: { width: "50%", maxHeight: "70%" } }}
                      >
                        <DialogTitle>Rating for {product ? product.pname : null}</DialogTitle>
                        <DialogContent>
                          <DialogContentText paddingBottom='40px'>
                            From 0 to 5, how is your experience with the car?
                          </DialogContentText>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="rating"
                            label="Rating"
                            type="rating"
                            fullWidth
                            variant="standard"
                            value={ratingInt}
                            onChange={handleChangeRating}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseRating}>Cancel</Button>
                          <Button onClick={() => { postRating() }}>Okay</Button>
                        </DialogActions>
                      </Dialog>
                      <Dialog
                        className="dialog-popup"
                        open={openCancel}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleCloseCancel}
                        aria-describedby="alert-dialog-slide-description"
                        BackdropProps={{ style: { backgroundColor: "rgba(64, 64, 64, 0.2)" } }}
                      >
                        <DialogTitle>
                          <span className='dialog-text'>
                            Are you sure you want to cancel your order {product ? product.pname : null}?
                          </span>
                        </DialogTitle>
                        <DialogActions>
                          <button className='dialog-button-no' onClick={handleCloseCancel}>NO</button>
                          <button className='dialog-button-yes' onClick={() => { cancelProduct() }}>YES</button>
                        </DialogActions>
                      </Dialog>
                      <Dialog
                        className="dialog-popup"
                        open={openRefund}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleCloseCancel}
                        aria-describedby="alert-dialog-slide-description"
                        BackdropProps={{ style: { backgroundColor: "rgba(64, 64, 64, 0.2)" } }}
                      >
                        <DialogTitle>
                          <span className='dialog-text'>
                            Are you sure you want to request a return and refund {product ? product.pname : null}?
                          </span>
                        </DialogTitle>
                        <DialogActions>
                          <button className='dialog-button-no' onClick={handleCloseCancel}>NO</button>
                          <button className='dialog-button-yes' onClick={() => { refundProduct() }}>YES</button>
                        </DialogActions>
                      </Dialog>
                    </Stack>
                    : null
                ))}
              </Stack>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <ToastContainer
        autoClose={2000}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {})(Orders)
