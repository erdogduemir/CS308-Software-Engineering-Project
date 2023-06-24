import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { AUTH_USERS_ME, CUSTOMERS_API_URL } from '../constants';
import axios from 'axios';
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { Stack } from '@mui/material';

function Notifications({ isAuthenticated }) {

    const [userInfo, setUserInfo] = useState()
    const [wishList, setWishList] = useState([])

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }

    useEffect(() => {
        axios.get(AUTH_USERS_ME, config).then((response) => {
            axios.get(CUSTOMERS_API_URL + response.data.email + "/").then((response) => {
                setUserInfo(response.data)
                setWishList(response.data.wishList.split(',').map(Number))
                console.log('wishlist below:')
                console.log(response.data.wishList.split(',').map(Number))
            })
        })
    }, [])

    if (!isAuthenticated) {
        return <Navigate replace to='/home' />
    }

    return (
        <div className='containerNavbarPage'>
            <div>
                <Navbar />
                <h1 style={{ display: 'flex', alignItems: 'start', marginLeft: '16vw' }}>Notifications</h1>
                <div className="notification-card">
                    <Stack direction="column">
                    </Stack>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Notifications)