import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { postData } from '../FetchNodeServices';
import { errorMessage, isEmpty,isEmail, isDigits, successMessage } from '../Checks';
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const defaultTheme = createTheme();

export default function AdminRegistration() {
  const history=useNavigate();
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [emailId,setEmailId] = useState("");
    const [hospitalName,setHospitalName] = useState("");
    const [address,setAddress] = useState("");
    const [city,setCity] = useState("");
    const [postal,setPostal] = useState("");
    const [password,setPassword] = useState("");
    const [cnfpassword,setCnfPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const handleClick = async() => {
    var err = false;
    if(isEmpty(firstName)){
        err=true;
        errorMessage("First Name should not be blank.")
    }
    if(isEmpty(lastName)){
        err=true;
        errorMessage("Last Name should not be blank.")
    }
    if(!isEmail(emailId)){
        err=true;
        errorMessage("First Name should not be blank.")
    }
    if(isEmpty(hospitalName)){
        err=true;
        errorMessage("Hospital Name should not be blank.")
    }
    if(isEmpty(address)){
        err=true;
        errorMessage("Address should not be blank.")
    }
    if(isEmpty(city)){
        err=true;
        errorMessage("City should not be blank.")
    }
    if(!isDigits(postal)){
        err=true;
        errorMessage("postal code should be numeric value")
    }
    if(isEmpty(postal)){
        err=true;
        errorMessage("Postal Code should not be blank.")
    }
    if(!isDigits(password)){
        err=true;
        errorMessage("Password should be numeric value")
    }
    if(isEmpty(password)){
        err=true;
        errorMessage("Password should not be blank.")
    }
    if(!isDigits(cnfpassword)){
        err=true;
        errorMessage("Confirm Password should be numeric value")
    }
    if(isEmpty(cnfpassword)){
        err=true;
        errorMessage("Confirm Password should not be blank.")
    }
    if(password!==cnfpassword){
        err=true;
        errorMessage("password and confirm password do not match.")
    }
    if(!err){
        var body = {firstName:firstName,lastName:lastName,emailId:emailId,hospitalName:hospitalName,address:address,city:city,postal:postal,password:password}
        var res = await postData('admin/insertdata',body);
        
        if(res.result){
            successMessage("Record Submitted Successfully!")
            setTimeout(() => {
              history({pathname:"/adminlogin"});
            }, 2 * 1000);
        }
        else{
            Swal.fire({imageUrl: '/pharmacy.png',
                        imageWidth:200,
                      title:'Booking.com',
                      text:'Its Email is already registered',

                    }) 
        }
    }



  }

  return (
    <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Registration
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(event)=>setFirstName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(event)=>setLastName(event.target.value)}
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
                  onChange={(event)=>setEmailId(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="hospitalName"
                  label="Hospital Name"
                  name="hospitalName"
                  autoComplete="hospitalName"
                  onChange={(event)=>setHospitalName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  onChange={(event)=>setAddress(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  //autoComplete="given-name"
                  name="city"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  autoFocus
                  onChange={(event)=>setCity(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="postal"
                  label="Postal Code"
                  name="postal"
                  autoComplete="family-name"
                  onChange={(event)=>setPostal(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="new-password"
                  name="password"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  autoFocus
                  onChange={(event)=>setPassword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="cnfpassword"
                  label="Confirm Password"
                  name="cnfpassword"
                  autoComplete="family-name"
                  onChange={(event)=>setCnfPassword(event.target.value)}
                />
              </Grid>
              <Grid container style={{justifyContent:'center',justifyItems:'center',display:'flex',marginTop:7}}>
              <Grid item>
                <Link href="/forget" variant="body2">
                  Forget Password?
                </Link>
              </Grid>
            </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              onClick={()=>handleClick()}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item style={{marginBottom:12}}>
                <Link href="/adminlogin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer/>
     
    </ThemeProvider>
  );
}