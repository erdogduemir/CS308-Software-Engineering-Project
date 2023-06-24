import React, { useState, useEffect } from 'react'
import '../App.css'
import '../constants/Navbar.css';
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { AUTH_USERS_ME, CUSTOMERS_API_URL } from '../constants';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

function Navbar({ logout, isAuthenticated }) {

    const [userInfo, setUserInfo] = useState(
        {
            is_staff: false,
            is_superuser: false
        }
    )

    const navigate = useNavigate()

    const guestLinks = () => (
        <div className="dropdownRight-contentRight">
            <a onClick={() => navigate('../shoppingcartpage')}>Cart</a>
            <a onClick={() => navigate('../login')}>Login</a>
        </div>
    )

    const authLinks = () => (
        <div className="dropdownRight-contentRight">
            <a onClick={() => navigate('../shoppingcartpage')}>Cart</a>
            <a onClick={() => navigate('../wishlist')}>Wish List</a>
            <a onClick={() => navigate('../profile')}>Profile</a>
            <a onClick={() => navigate('../orders')}>Orders</a>
            <a onClick={() => { toast.success("Logged out!"); logoutHandler() }}>Logout</a>
        </div>
    )

    function refreshPage() {
        window.location.reload(true);
    }

    const logoutHandler = () => (
        //toast("Logged out!")
        setTimeout(() => {
            logout()
            refreshPage()
        }, 3000)
    )

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
            })
        })
        console.log("NAVBAR data below:")
        console.log(userInfo)
    }, [])

    return (
        <div className="bg-img">
            <div className="topnav" id="myTopnav">
                <img onClick={() => navigate('../home')} className='centered-label' src="../../logo_clear_2.png" alt="logo" />

                <div className="dropdownLeft">
                    <button className="dropbtnLeft" onClick={() => navigate('../categoriespage')}>Cars Models

                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdownLeft-contentLeft">
                        <a onClick={() => navigate('../sedancarpage')}>Sedan</a>
                        <a onClick={() => navigate('../suvcarpage')}>SUV</a>
                        <a onClick={() => navigate('../hatchbackcarpage')}>Hatchback</a>
                    </div>

                </div>

                <a onClick={() => navigate('../SearchPage')}>Search</a>

                {userInfo.is_superuser
                    ? <a onClick={() => navigate('../admin/dashboard')}>Admin Dashboard</a>
                    : userInfo.is_staff
                        ? <a onClick={() => navigate('../admin/dashboard')}>Sales Dashboard</a>
                        : null
                }

                <a href="javascript:void(0);" className="icon">&#9776;</a>
                <div className="dropdownRight">
                    <button className="dropbtnRight">User
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdownRight-contentRight">
                        {isAuthenticated ? authLinks() : guestLinks()}
                    </div>
                </div>
                <div className="dropdownRight">
                    <button className="dropbtnRight" onClick={() => navigate('../notifications')}>
                        <FontAwesomeIcon
                            icon={faBell} />
                    </button>
                </div>
            </div>
            <ToastContainer
                autoClose={2000}
            />
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Navbar)