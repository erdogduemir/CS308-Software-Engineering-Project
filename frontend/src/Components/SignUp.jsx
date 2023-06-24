import React, { useState } from 'react';
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
import { signup } from '../actions/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const theme = createTheme();

function SignUp({ signup, isAuthenticated }) {

  const [signupType, setSignupType] = useState(0)
  const [accountCreated, setAccountCreated] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    tax_id: '',
    home_address: '',
    email: '',
    password: '',
    re_password: ''
  })

  const { name, surname, tax_id, home_address, email, password, re_password } = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()

    if (name != '' && surname != '' && tax_id != '' && home_address != ''
      && email != '' && password != '') {
      if (password === re_password) {
        notify()
        setTimeout(() => {
          if (signupType === 0) {
            signup(name, surname, tax_id, home_address, "", false, false, email, password, re_password)
          } else if (signupType === 1) {
            signup(name, surname, tax_id, home_address, "", false, true, email, password, re_password)
          } else {
            signup(name, surname, tax_id, home_address, "", true, false, email, password, re_password)
          }
          
          setAccountCreated(true)
        }, 3000)
      } else {
        toast.error("Passwords do not match", { autoClose: false })
      }
    } else {
      toast.error("Please fill all the required fields", { autoClose: false })
    }
  }

  const handleSignupType = (event, newSignupType) => {
    setSignupType(newSignupType)
    console.log("Signup type: " + newSignupType)
  }

  if (isAuthenticated) {
    return <Navigate replace to='/' />
  }

  if (accountCreated) {
    return <Navigate replace to='/login' />
  }

  const notify = () => toast.success("Signed up! Heading to login...")

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
          <img style={{ width: 250 }} src="../../logo_clear.png" alt="logo" />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={e => onSubmit(e)} sx={{ mt: 1 }}>
            <ToggleButtonGroup
              exclusive
              value={signupType}
              aria-label="signup-type"
              onChange={handleSignupType}
              fullWidth
              sx={{marginBottom:'10px'}}
            >
              <ToggleButton value={0} aria-label="left aligned">
                <span style={{ fontSize: '10px' }}>Customer</span>
              </ToggleButton>
              <ToggleButton value={1} aria-label="centered">
                <span style={{ fontSize: '10px' }}>Product Manager</span>
              </ToggleButton>
              <ToggleButton value={2} aria-label="right aligned">
                <span style={{ fontSize: '10px' }}>Sales Manager</span>
              </ToggleButton>
            </ToggleButtonGroup>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
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
                  autoComplete="family-name"
                  onChange={e => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="tax_id"
                  label="Tax ID"
                  name="tax_id"
                  autoComplete="tax_id"
                  onChange={e => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="home_address"
                  label="Address"
                  name="home_address"
                  autoComplete="home_address"
                  onChange={e => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={e => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={e => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="re_password"
                  label="Confirm Password"
                  type="password"
                  id="re_password"
                  autoComplete="re-new-password"
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link className='login-links' to='../login'>
                  Already have an account? Log in
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

export default connect(mapStateToProps, { signup })(SignUp)