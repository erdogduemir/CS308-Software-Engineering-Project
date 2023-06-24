import * as React from 'react';
import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../actions/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

function Login({ login, isAuthenticated }) {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()

        if (email != '' && password != '') {
            notify()
            setTimeout(() => {
                const response = login(email, password)
                console.log("RESPONSEEE")
                console.log(response)
                if (response >= 400) {
                    toast.error("Check your credentials", {autoClose:false})
                }
            }, 3000)
        } else {
            toast.error("Email and password fields must not be empty", {autoClose:false})
        }
    }

    if (isAuthenticated) {
        return <Navigate replace to='/' />
    }

    const notify = () => toast.success("Successfully logged in!")

    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <img style={{width:350}} src="../../logo_clear.png" alt="logo" />
            <Typography component="h1" variant="h5">
                Log in
            </Typography>
            <Box component="form" onSubmit={e => onSubmit(e)} noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => onChange(e)}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => onChange(e)}
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Log In
                </Button>
                <Grid container>
                <Grid item xs>
                    <Link className='login-links' to='../reset-password'>
                    Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link className='login-links' to='../signup'>
                    Don't have an account? Sign Up
                    </Link>
                </Grid>
                </Grid>
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

export default connect(mapStateToProps, { login })(Login)