import React, { useContext, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { AUTH_USERS_ME, ORDERS_API_URL, PRODUCTS_API_URL } from '../constants';
import { CartContext } from '../constants/CartContext';

const theme = createTheme();

function Payment({ isAuthenticated }) {

    const [userInfo, setUserInfo] = useState({
        name: '',
        surname: ''
    })
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        card_number: '',
        expire_date: '',
        cvv: '',
        installment: '',
    })

    const cart = useContext(CartContext)

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }

    function send_to_orders() {
        axios.get(AUTH_USERS_ME, config).then((response) => {
            axios.post(ORDERS_API_URL, {
                'customer': response.data.id,
                'address': response.data.home_address,
                'order_date': new Date().toLocaleDateString('en-GB'),
                'total_product': (cart.globalCart).length,
                'all_products': cart.globalCart.map((item) => item.pk) + "",
                'total_cost': cart.globalCart.reduce((a, v) => a = a + v.pprice, 0),
                "all_costs": cart.globalCart.reduce((a, v) => a = a + v.pprice, 0),
                'status': 'processing',
                'isSentToDelivery': false
            })
        })
        cart.globalCart.map((product) => (
            axios.put(PRODUCTS_API_URL + product.pk + "/",
            {
                'pk': product.pk,
                'pid': product.pid,
                'pname': product.pname,
                'pmodel': product.pmodel,
                'pnumber': product.pnumber,
                'pdescription': product.pdescription,
                'pstock': product.pstock - cart.globalCart.filter((item) => item.pk === product.pk).length,
                'pprice': product.pprice,
                'pwarranty': product.pwarranty,
                'pdistinfo': product.pdistinfo,
                'pcategory': product.pcategory,
                'ppopularity': product.ppopularity,
                'psales_discount': product.psales_discount
            })
        ))
    }

    const { name, surname, card_number, expire_date, cvv, installment } = formData
    const navigate = useNavigate()

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()

        if (name != '' && surname != '' && card_number != '' && expire_date != ''
            && cvv != '' && installment != '') {
            notify()
            setTimeout(() => {
                navigate('/')
                send_to_orders()
            }, 3000)
        } else {
            toast.error("Please fill all the required fields", { autoClose: false })
        }
    }

    useEffect(() => {
        axios.get(AUTH_USERS_ME, config).then((response) => {
          setUserInfo(response.data)
          console.log(response.data)
        })
      }, [])

    if (!isAuthenticated) {
        return <Navigate replace to='/login' />
    }

    const notify = () => toast.success("Purchase is successful!")

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img style={{ width: 350 }} src="../../logo_clear.png" alt="logo" />
                    <Typography component="h1" variant="h5">
                        Purchase
                    </Typography>
                    <Box component="form" noValidate onSubmit={e => onSubmit(e)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    defaultValue={userInfo?.name}
                                    autoFocus
                                    onChange={e => onChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="surname"
                                    label="Surname"
                                    name="surname"
                                    defaultValue={userInfo?.surname}
                                    autoComplete="family-name"
                                    onChange={e => onChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="card_number"
                                    label="Card Number"
                                    name="card_number"
                                    autoComplete="card_number"
                                    onChange={e => onChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="expire_date"
                                    label="Expire date"
                                    name="expire_date"
                                    autoComplete="expire_date"
                                    onChange={e => onChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="cvv"
                                    label="CVV"
                                    name="cvv"
                                    autoComplete="cvv"
                                    onChange={e => onChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="'installment'"
                                    label="Installment"
                                    name="installment"
                                    autoComplete="installment"
                                    onChange={e => onChange(e)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Purchase
                        </Button>
                    </Box>
                </Box>
            </Container>
            <ToastContainer
                autoClose={2000}
            />
        </ThemeProvider>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {})(Payment)