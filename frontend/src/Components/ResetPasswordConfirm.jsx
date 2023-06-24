import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { reset_password_confirm } from '../actions/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

function ResetPasswordConfirm({ reset_password_confirm }) {

    const[requestSent, setRequestSent] = useState(false)
    const { uid, token } = useParams()

    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    })

    const { new_password, re_new_password } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    useEffect(() => {
        console.log('UID: ' + uid + ', token: ' + token)
      }, [])

    const onSubmit = e => {
        e.preventDefault()

        setTimeout(() => {
            reset_password_confirm(uid, token, new_password, re_new_password)
            setRequestSent(true)
        }, 3000)
        
    }

    if (requestSent) {
        return <Navigate replace to='/home' />
    }

    const notify = () => toast.success("Password is changed!")

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
                name="new_password"
                label="New Password"
                type="password"
                id="new_password"
                autoComplete="current-password"
                onChange={e => onChange(e)}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="re_new_password"
                label="Re-enter New Password"
                type="password"
                id="re_new_password"
                autoComplete="current-password"
                onChange={e => onChange(e)}
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={notify}
                >
                Reset Your Password
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

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm)