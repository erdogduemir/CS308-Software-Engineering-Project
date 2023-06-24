import axios from 'axios'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    LOGOUT
} from './types'
import {
    AUTH_JWT_CREATE,
    AUTH_JWT_VERIFY,
    AUTH_USERS,
    AUTH_USERS_ACTIVATION,
    AUTH_USERS_ME,
    AUTH_USERS_RESET_PASSWORD,
    AUTH_USERS_RESET_PASSWORD_CONFIRM
} from '../constants/index'

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        const body = JSON.stringify({ token: localStorage.getItem('access') })

        try {
            const res = await axios.post(`${AUTH_JWT_VERIFY}`, body, config)

            if (res.data.code !== 'token-not-valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                })
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                })
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            })
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }
}

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }

        try {
            const res = await axios.get(`${AUTH_USERS_ME}`, config)
    
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            })
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        })
    }
}

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password })

    try {
        const res = await axios.post(`${AUTH_JWT_CREATE}`, body, config)
                        .catch(function (error) {
                            if (error.response) {
                                console.log(error.response.data)
                                console.log(error.response.status)
                                console.log(error.response.headers)
                                return error.response.status
                            }
                        })

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(load_user())
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

export const signup = (name, surname, tax_id, home_address, wishList, notificationList, is_staff, is_superuser, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, surname, tax_id, home_address, wishList, notificationList, is_staff, is_superuser, email, password, re_password })

    try {
        const res = await axios.post(`${AUTH_USERS}`, body, config)

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
    }
}

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ uid, token })

    try {
        await axios.post(`${AUTH_USERS_ACTIVATION}`, body, config)

        dispatch({
            type: ACTIVATION_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
}

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email })

    try {
        await axios.post(`${AUTH_USERS_RESET_PASSWORD}`, body, config)

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        })
    } catch(err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        })
    }
}

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ uid, token, new_password, re_new_password })

    try {
        await axios.post(`${AUTH_USERS_RESET_PASSWORD_CONFIRM}`, body, config)

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        })
    } catch(err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        })
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}