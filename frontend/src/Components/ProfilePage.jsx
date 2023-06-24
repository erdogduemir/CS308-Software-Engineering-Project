import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { AUTH_USERS_ME, CUSTOMERS_API_URL } from '../constants';
import axios from 'axios';
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { Stack } from '@mui/material';

function ProfilePage({ isAuthenticated }) {

    const [post, setPost] = useState([])

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
                setPost(response.data)
            })
        })
        console.log(post)
    }, [])

    if (!isAuthenticated) {
        return <Navigate replace to='/home' />
    }

    return (
        <div className='containerNavbarPage'>
            <div>
                <Navbar />
                <div className="card">
                    <Stack direction="column">
                        <p><span>Name: </span>{post.name}</p>
                        <p><span>Surname: </span>{post.surname}</p>
                        <p><span>Email: </span>{post.email}</p>
                        <p><span>Tax ID: </span>{post.tax_id}</p>
                        <p><span>Address: </span>{post.home_address}</p>
                    </Stack>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(ProfilePage)