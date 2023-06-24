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
import { CUSTOMERS_API_URL, ORDERS_API_URL } from '../../constants';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AdminOrdersPage() {

  const [post, setPost] = useState([])

  function refreshPage() {
    window.location.reload(true);
  }

  useEffect(() => {
    axios.get(ORDERS_API_URL).then((response) => {
      setPost(response.data)
      console.log(response.data)
    })
  }, [])

  function updateStatus(row) {
    if (row.status === "processing") {
      axios.put(ORDERS_API_URL + row.pk + "/",
        {
          "pk": row.pk,
          "all_products": row.all_products,
          "customer": row.customer,
          "address": row.address,
          "isSentToDelivery": row.isSentToDelivery,
          "order_date": row.order_date,
          "status": "intransit",
          "total_cost": row.total_cost,
          "all_costs": row.all_costs,
          "total_product": row.total_product,
          "refunded_items": row.refunded_items,
          "return_requested_items": row.return_requested_items
        }
      )
    } else {
      axios.put(ORDERS_API_URL + row.pk + "/",
        {
          "pk": row.pk,
          "all_products": row.all_products,
          "customer": row.customer,
          "address": row.address,
          "isSentToDelivery": row.isSentToDelivery,
          "order_date": row.order_date,
          "status": "delivered",
          "total_cost": row.total_cost,
          "all_costs": row.all_costs,
          "total_product": row.total_product,
          "refunded_items": row.refunded_items,
          "return_requested_items": row.return_requested_items
        }
      )
    }
    refreshPage()
  }

  return (
    <div className="dashboard main-content">
      <header className="page-header">
        <span className="page-title">Deliveries</span>
      </header>
      <Sidebar />
      <div className='comments-container'>
        <Stack direction='column'>
          <h3 className='awaiting-approval'>Delivery Status</h3>
          <div className='dashboard-table'>
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
                    <TableCell style={{ fontWeight: '600' }} align="center">Processing</TableCell>
                    <TableCell style={{ fontWeight: '600' }} align="center">In Transit</TableCell>
                    <TableCell style={{ fontWeight: '600' }} align="center">Delivered</TableCell>
                    <TableCell style={{ fontWeight: '600' }} align="center">Refunded Products</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {post.slice(0).reverse().map((row) => (
                    <TableRow
                      key={row.pk}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center" style={{width:'5vw'}}>
                        {row.pk}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center" style={{width:'5vw'}}>
                        {row.customer}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center" style={{width:'5vw'}}>
                        {row.all_products}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center" style={{width:'5vw'}}>
                        {row.total_product}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        ${Math.round(row.total_cost).toLocaleString()}
                      </TableCell>
                      <TableCell component="th" scope="row" align="left"
                      style={{width:'200px'}}
                      >
                        {row.address}
                      </TableCell>
                      <TableCell align="center">{row.order_date}</TableCell>
                      {row.status === "processing"
                        ? <TableCell align="center">
                          <FontAwesomeIcon
                            icon={faBoxesPacking}
                            className='ongoing-process'
                            onClick={() => { updateStatus(row) }} />
                        </TableCell>
                        : <TableCell align="center">
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            className='x-mark'/>
                        </TableCell>}

                      {row.status === "intransit"
                        ? <TableCell align="center">
                          <FontAwesomeIcon
                            icon={faTruckArrowRight}
                            className='ongoing-process'
                            onClick={() => { updateStatus(row) }} />
                        </TableCell>
                        : <TableCell align="center">
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            className='x-mark'/>
                        </TableCell>}

                      {row.status === "delivered"
                        ? <TableCell align="center">
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            className='checkmark' />
                        </TableCell>
                        : <TableCell align="center">
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            className='x-mark' />
                        </TableCell>}

                        <TableCell component="th" scope="row" align="center" style={{width:'5vw'}}>
                        {row.refunded_items}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Stack>
      </div>
    </div>
  );
}