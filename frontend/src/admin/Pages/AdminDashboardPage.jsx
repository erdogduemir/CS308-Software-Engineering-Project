import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Components/AdminDesign.css';
import Sidebar from './Functions/Sidebar.jsx';
import { Stack } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSackDollar, faTruck, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { ORDERS_API_URL, AUTH_USERS_ME } from '../../constants';
import axios from 'axios';
import { Pie, PieChart, Cell, Legend } from 'recharts'

const labels = ['Loss', 'Profit']

function AdminDashboardPage({ isAuthenticated }) {

  const [post, setPost] = useState([])
  const [userInfo, setUserInfo] = useState(
    {
      is_staff: false,
      is_superuser: false
    }
  )
  const [data, setData] = useState([
    {
      "name": "Group A",
      "value": 400
    },
    {
      "name": "Group B",
      "value": 300
    }
  ])
  const [showComponent, setShowComponent] = useState(false)

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Accept': 'application/json'
    }
  }

  useEffect(() => {
    axios.get(ORDERS_API_URL).then((response) => {
      setPost(response.data)
      console.log('orders below:')
      console.log(response.data)
    })
    axios.get(AUTH_USERS_ME, config).then((response) => {
      setUserInfo(response.data)
      console.log("current user below:")
      console.log(response.data)
    })
    setTimeout(() => {
      setShowComponent(true);
    }, 1000)
  }, [])

  if (!isAuthenticated) {
    return <Navigate replace to='/' />
  }

  return (
    <div className="dashboard main-content">
      <header className="page-header">
        <span className="page-title">Welcome to your dashboard</span>
      </header>
      <Sidebar />
      <div className="admin-dashboard-container">
        <Stack direction="row" style={{ width: "80vw" }}>
          <div className="dashboard-card" style={{ backgroundColor: "#FDF2D5", color: "#8C7336" }}>
            <Stack direction="row" className='dashboard-card-content'>
              <div>
                <h3>Sold Items</h3>
                <p>{post.length}</p>
              </div>
              <FontAwesomeIcon icon={faCartShopping} className='dashboard-card-icon' />
            </Stack>
          </div>
          <div className="dashboard-card" style={{ backgroundColor: "#DBEDDE", color: "#3D663E" }}>
            <Stack direction="row" className='dashboard-card-content'>
              <div>
                <h3>Income</h3>
                <p>${post.reduce((a, v) => a = a + parseInt(v.total_cost, 10), 0)}</p>
              </div>
              <FontAwesomeIcon icon={faSackDollar} className='dashboard-card-icon' />
            </Stack>
          </div>
          <div className="dashboard-card" style={{ backgroundColor: "#D6E7FC", color: "#2D548C" }}>
            <Stack direction="row" className='dashboard-card-content'>
              <div>
                <h3>Deliveries</h3>
                <p>{post.filter(element => {
                  if (element.status === 'delivered') {
                    return true;
                  }
                  return false;
                }).length}</p>
              </div>
              <FontAwesomeIcon icon={faTruck} className='dashboard-card-icon' />
            </Stack>
          </div>
        </Stack>
        <Stack direction='column' style={{ marginTop: "20px" }}>
          {userInfo.is_superuser
            ? <div>
              <h3 className='latest-orders'>Latest orders today</h3>
              <div className='dashboard-table'>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ fontWeight: '600' }} align="center">Order pk</TableCell>
                        <TableCell style={{ fontWeight: '600' }} align="left">Address</TableCell>
                        <TableCell style={{ fontWeight: '600' }} align="center">Date</TableCell>
                        <TableCell style={{ fontWeight: '600' }} align="center">Delivery Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {post.filter(d => d.order_date === new Date().toLocaleDateString('en-GB')).map((row) => (
                        <TableRow
                          key={row.pk}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row" align="center">
                            {row.pk}
                          </TableCell>
                          <TableCell component="th" scope="row" align="left"
                            style={{ width: '200px' }}
                          >
                            {row.address}
                          </TableCell>
                          <TableCell align="center">{row.order_date}</TableCell>
                          <TableCell align="center">
                            <Link
                              style={{ display: 'inline', borderBottom: '1px solid black', color: 'black' }}
                              to={"/admin/orders"}
                            >
                              <span style={{ fontWeight: 'bold' }}>Go to orders page</span> &nbsp;
                              <FontAwesomeIcon style={{ 'scale': '0.8' }} icon={faArrowRight} />
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
            : showComponent && <PieChart width={730} height={350} style={{ marginTop: '40px' }}>
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} label="wow">
                {
                  data.map((entry, index) => (
                    <Cell name={data[index].name} key={`cell-${index}`} fill={['#2f66b6', '#60b76e'][index]} />
                  ))
                }
              </Pie>
            </PieChart>
          }
        </Stack>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(AdminDashboardPage);
