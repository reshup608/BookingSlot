import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { postData } from '../FetchNodeServices';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import { isEmpty,isEmail,errorMessage } from '../Checks';
import Swal from 'sweetalert2';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function UserForget() {
  const history=useNavigate();
    const [emailId,setEmailId] = useState("")
    const [password,setPassword] = useState("")
    const [cnfPassword,setCnfPassword] = useState("")
    const [open, setOpen] = React.useState(false);
   
    

    
    const handlepassword = async() => {
       var err=false;
       if(isEmpty(password)){
        err=true;
        errorMessage("Password should not be blank")
       }
       if(isEmpty(cnfPassword)){
        err=true;
        errorMessage("Confirm Password should not be blank")
       }
       if(password===cnfPassword && !err){
        var body = {emailId:emailId,password:password}
        var res = await postData('user/editpassword',body)
        if(res){
           setOpen(false);
            Swal.fire({
                imageUrl: '/Booking.png',
                imageWidth:200,
                title:'Booking.com',
                text:'Password has been changed successfully!',
            })
            setTimeout(()=>{
              history("/userlogin")
            },1*1000)

        }
        else{
           setOpen(false);

            Swal.fire({
                    imageUrl: '/Booking.png',
                    imageWidth:200,
                    title:'Booking.com',
                    text:'Failed to be updated!',
            })
          
        }
       }
       else{
        errorMessage("Password and Confirm Password should be same!")
    }}
    

    const handleClose = () => {
        setOpen(false);
    };

  const storeDialog = () => {
    return (
    <div>
      
      <Dialog
        
        fullWidth={true}
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
         
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',

            }}
            onSubmit={handleSubmit1} 
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', flexDirection:'column',margin:'auto'}}>
            <LockOutlinedIcon />
          </Avatar>
          <DialogTitle>Change Password</DialogTitle>
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              autoFocus
              onChange={(event)=>setPassword(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="cnfPassword"
              label="Confirm Password"
              name="cnfPassword"
              autoComplete="cnfPassword"
              autoFocus
              onChange={(event)=>setCnfPassword(event.target.value)}
            />
            <Button
              type="submit"
              
              variant="contained"
              
              sx={{ mt: 2, mb: 1 ,marginLeft:6,marginRight:6}}
              onClick={()=>handlepassword()}
            >
              Save
            </Button>
              
              </FormControl>
            
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

  const handleEmail = async() => {
    var email = {emailId:emailId}
    var res=false;
    if(!isEmpty(emailId)){
        res = await postData('user/checkemailid',email)   
    }
    if(emailId===""){
        errorMessage("Email should not be blank")
    }
    else if(!isEmail(emailId)){
      errorMessage("Pls Filled Email correct form")
    }
    else if(res.result){
        setOpen(true);
    }
    else{
        errorMessage("This Email is not registered!")
    }
  
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const handleSubmit1 = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('password'),
      password: data.get('cnfPassword'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forget Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event)=>setEmailId(event.target.value)}
            />
            
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>handleEmail()}
            >
              Change Password
            </Button>
            
          </Box>
        </Box>
        <ToastContainer/>
       <div>{storeDialog()}</div>
      </Container>
    </ThemeProvider>
  );
}