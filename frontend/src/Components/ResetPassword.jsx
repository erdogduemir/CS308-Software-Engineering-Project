import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { reset_password } from '../actions/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

function ResetPassword({ reset_password }) {

    const[requestSent, setRequestSent] = useState(false)

    const [formData, setFormData] = useState({
        email: ''
    })

    const { email } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        setTimeout(() => {
            reset_password(email)
            setRequestSent(true)
        }, 3000)
        
    }

    if (requestSent) {
        return <Navigate replace to='/home' />
    }

    const notify = () => toast.success("Email is sent to change the password!!")

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
                Reset Your Password
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
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={notify}
                >
                Confirm the email
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

export default connect(null, { reset_password })(ResetPassword)