import React, { useState, useEffect } from 'react';
import '../Components/AdminDesign.css';
import Sidebar from './Functions/Sidebar.jsx';
import ProductCard from './Functions/ProductCard';
import { Stack } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { PRODUCTS_API_URL, AUTH_USERS_ME } from '../../constants';
import axios from 'axios';
import { connect } from 'react-redux'

function Products({ isAuthenticated }) {

  const [post, setPost] = useState([])
  const [userInfo, setUserInfo] = useState(
    {
      is_staff: false,
      is_superuser: false
    }
  )

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Accept': 'application/json'
    }
  }

  useEffect(() => {
    fetchProducts()
    axios.get(AUTH_USERS_ME, config).then((response) => {
      setUserInfo(response.data)
      console.log("current user below:")
      console.log(response.data)
    })
  }, [])

  function fetchProducts() {
    axios.get(PRODUCTS_API_URL).then((response) => {
      setPost(response.data)
      console.log(response.data)
    })
  }

  if (!isAuthenticated) {
    return <Navigate replace to='/' />
  }

  return (
    <div className='dashboard main-content'>
      <header className="page-header">
        <span className="page-title">Your Products</span>
      </header>
      <Sidebar />
      <div className="products-container">
        <Stack direction="column">
          {userInfo.is_superuser
            ? <Stack direction="row" spacing="2vw">
              <div className="add-new-product">
                <Link className="view-or-edit" to="/admin/add-product">
                  <FontAwesomeIcon icon={faPlus} /> &nbsp;
                  <span>
                    Add new product
                  </span>
                </Link>
              </div>
              <div className="add-new-product">
                <Link className="view-or-edit" to="/admin/categories">
                  <FontAwesomeIcon icon={faArrowRight} /> &nbsp;
                  <span>
                    Check the categories
                  </span>
                </Link>
              </div>
            </Stack>
            : null
          }
          {post.map((product) => (
            <ProductCard
              key={product.pid}
              product={product}
              is_superuser={userInfo.is_superuser}
            />
          ))}
        </Stack>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Products);