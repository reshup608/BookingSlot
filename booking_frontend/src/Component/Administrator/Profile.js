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
                <span style={{ marginBottom: '20px', marginLeft: '-6px' }}><Link to='/adminhome'><ArrowBackIcon to='/app' color="disabled" /></Link>&nbsp;</span>
                <div style={{ padding: 2, marginBottom: '13px', fontSize: 18, color: '#6d6b6a', fontFamily: 'sans-serif' }}>Profile</div>
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
            main: '#fff',
        },
    },
});

export default function Profile() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [hospitalName, setHospitalName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postal, setPostal] = useState("");
    const emailId = sessionStorage.getItem('email');
    const [isEditEnabled, setIsEditEnabled] = useState(false);
    const [code, setCode] = useState("");

    const fetchAllDetails = async () => {
        var body = { emailId: emailId }
        var list = await postData('admin/fetchadminbyemail', body)
        setFirstName(list.data[0].firstName);
        setLastName(list.data[0].lastName);
        setHospitalName(list.data[0].hospitalName);
        setAddress(list.data[0].address);
        setCity(list.data[0].city);
        setPostal(list.data[0].postal);
       
    }

    const fetchHexcode = async () => {
        var body = { emailId: emailId }
        var res = await postData('admin/fetchhexcode', body);
        setCode(res.data[0].hexcode);
    }

    const handleCopyCode = () => {
        navigator.clipboard.writeText(code);
        successMessage("Copied Code!")
    };

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
        if (isEmpty(hospitalName)) {
            err = true;
            errorMessage("Hospital Name should not be blank.")
        }
        if (isEmpty(address)) {
            err = true;
            errorMessage("Address should not be blank.")
        }
        if (isEmpty(city)) {
            err = true;
            errorMessage("City should not be blank.")
        }
        if (!isDigits(postal)) {
            err = true;
            errorMessage("postal code should be numeric value")
        }
        if (isEmpty(postal)) {
            err = true;
            errorMessage("Postal Code should not be blank.")
        }

        if (!err) {
            var body = { firstName: firstName, lastName: lastName, emailId: emailId, hospitalName: hospitalName, address: address, city: city, postal: postal };
          
            var res = await postData('admin/editadmin', body);
          
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
        fetchHexcode();
        

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
                            <Grid item xs={12} sm={6}>
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
                            <Grid item xs={12} sm={6}>
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
                            <Grid item xs={12}>
                                {isEditEnabled ? <TextField
                                    required
                                    fullWidth
                                    id="hospitalName"
                                    label="Hospital Name"
                                    name="hospitalName"
                                    autoComplete="hospitalName"
                                    value={hospitalName}
                                    onChange={(event) => setHospitalName(event.target.value)}

                                /> : (
                                    <TextField
                                        required
                                        fullWidth
                                        id="hospitalName"
                                        label="Hospital Name"
                                        name="hospitalName"
                                        autoComplete="hospitalName"
                                        value={hospitalName}

                                    />)}
                            </Grid>
                            <Grid item xs={12}>
                                {isEditEnabled ? <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    name="address"
                                    autoComplete="address"
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}

                                /> : (
                                    <TextField
                                        required
                                        fullWidth
                                        id="address"
                                        label="Address"
                                        name="address"
                                        autoComplete="address"
                                        value={address}

                                    />)}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {isEditEnabled ? <TextField
                                    //autoComplete="given-name"
                                    name="city"
                                    required
                                    fullWidth
                                    id="city"
                                    label="City"
                                    autoFocus
                                    value={city}
                                    onChange={(event) => setCity(event.target.value)}

                                /> : (
                                    <TextField
                                        //autoComplete="given-name"
                                        name="city"
                                        required
                                        fullWidth
                                        id="city"
                                        label="City"
                                        autoFocus
                                        value={city}

                                    />)}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {isEditEnabled ? <TextField
                                    required
                                    fullWidth
                                    id="postal"
                                    label="Postal Code"
                                    name="postal"
                                    value={postal}
                                    onChange={(event) => setPostal(event.target.value)}

                                /> : (
                                    <TextField
                                        required
                                        fullWidth
                                        id="postal"
                                        label="Postal Code"
                                        name="postal"
                                        value={postal}

                                    />)}
                            </Grid>

                            <Grid container style={{ justifyContent: 'flex-start', display: 'flex', marginTop: 7 }}>
                                <Grid item>

                                </Grid>
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 2, mb: 2,backgroundColor:'#990ac8',color:'white'}}
                            disabled={!isEditEnabled}
                            onClick={() => handleClick()}
                        >
                            Edit Details
                        </Button>


                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>OR</div>
                        <div class="flex items-center">
                            <span class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-600 dark:text-white dark:border-gray-600">CODE</span>
                            <div class="relative w-full">
                                <input id="website-url" type="text" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-e-0 border-gray-300 text-gray-500 dark:text-gray-400 text-sm border-s-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={code} readonly disabled />
                            </div>
                            <button onClick={handleCopyCode} class="flex-shrink-0 z-10 inline-flex items-center py-3 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-e-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border border-blue-700 dark:border-blue-600 hover:border-blue-800 dark:hover:border-blue-700" type="button">
                                <span id="default-icon">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                                    </svg>
                                </span>
                                <span id="success-icon" class="hidden inline-flex items-center">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <br/>

                    </Box>
                </Box>
            </Container>
            <ToastContainer />
        </ThemeProvider>
    </div>
    );
}
