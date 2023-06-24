import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { verify } from '../actions/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

function Activate({ verify }) {

    const [verified, setVerified] = useState(false)

    const { uid, token } = useParams()

    useEffect(() => {
        console.log('UID: ' + uid + ', token: ' + token)
    }, [])

    const verify_account = e => {
        notify()
        setTimeout(() => {
            verify(uid, token)
            setVerified(true)
        }, 3000)
        
    }

    if (verified) {
        return <Navigate replace to='/' />
    }

    const notify = () => toast.success("Activated the account!")

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
            <Typography component="h1" variant="h5" style={{'paddingTop':'100px'}}>
                Verify your account
            </Typography>
            <Box style={{'paddingTop':'20px'}}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={verify_account}
                >
                Verify
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

export default connect(null, { verify })(Activate)