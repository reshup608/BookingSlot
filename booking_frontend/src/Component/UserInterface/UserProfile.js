import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ToastContainer } from 'react-toastify';
import Switch from '@mui/material/Switch';
import { useState, useEffect } from 'react';
import { postData } from '../FetchNodeServices';
import { successMessage, isEmpty, isDigits, errorMessage } from '../Checks';
import Swal from 'sweetalert2';



const label = { inputProps: { 'aria-label': 'Switch demo' } };
const defaultTheme = createTheme();


function appBarLabel() {
    return (
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <span style={{ marginBottom: '20px', marginLeft: '-6px' }}><Link to='/userhome'><ArrowBackIcon to='/app' color="white" /></Link>&nbsp;</span>
                <div style={{ padding: 2, marginBottom: '13px', fontSize: 18, color: 'white', fontFamily: 'sans-serif' }}>Profile</div>
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            </Typography>
        </Toolbar>
    );
}

const darkTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#990ac8',
        },
    },
});

export default function UserProfile() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const emailId = sessionStorage.getItem('email');
    const [isEditEnabled, setIsEditEnabled] = useState(false);


    const fetchAllDetails = async () => {
        var body = { emailId: emailId }
        var list = await postData('user/checkemailid', body)
        setFirstName(list.data[0].firstName);
        setLastName(list.data[0].lastName);
        console.log(list.data[0].firstName);
    }


    const handleEditToggle = () => {
        setIsEditEnabled(!isEditEnabled);
        if (!isEditEnabled) {
            successMessage("Edit Mode is Enabled")
        }
    };

    const handleClick = async () => {
        var err = false;
        if (isEmpty(firstName)) {
            err = true;
            errorMessage("First Name should not be blank.")
        }
        if (isEmpty(lastName)) {
            err = true;
            errorMessage("Last Name should not be blank.")
        }

        if (!err) {
            var body = { firstName: firstName, lastName: lastName, emailId: emailId };
            console.log(body)
            var res = await postData('admin/editadmin', body);
            console.log(res)
            if (res) {
                Swal.fire({
                    imageUrl: '/pharmacy.png',
                    imageWidth: 200,
                    title: 'Booking.com',
                    text: 'Record Updated Successfully',
                })
            }
            else {
                Swal.fire({
                    imageUrl: '/pharmacy.png',
                    imageWidth: 200,
                    title: 'Booking.com',
                    text: 'Something went wrong',
                })
            }

        }

    }




    useEffect(() => {
        fetchAllDetails();

        console.log(isEditEnabled)

    }, [isEditEnabled])

    return (<div>
        <Stack spacing={1} sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="static" color="primary" style={{ height: '45px' }}>
                    {appBarLabel()}
                </AppBar>
            </ThemeProvider>
        </Stack>

        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" style={{ marginTop: '14px' }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h2" variant="h5">
                        <span style={{ fontFamily: 'sans-serif', color: '#6d6b6a' }}>Basic Details Verified</span><Switch onClick={() => handleEditToggle()} {...label} />
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 2 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                {isEditEnabled ? <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}

                                /> : (
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={firstName}

                                    />)}

                            </Grid>
                            <Grid item xs={12}>
                                {isEditEnabled ? <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}

                                /> : (
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        value={lastName}

                                    />)}
                            </Grid>
                            <Grid item xs={12}>
                                {isEditEnabled ? <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={emailId}
                                    style={{ backgroundColor: '#f1f0e4' }}


                                /> : (
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={emailId}

                                    />)}
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 2, mb: 2, backgroundColor:'#990ac8',color:'white'}}
                            disabled={!isEditEnabled}
                            onClick={() => handleClick()}
                        >
                            Edit Details
                        </Button>
                        <br />

                    </Box>
                </Box>
            </Container>
            <ToastContainer />
        </ThemeProvider>
    </div>
    );
}
