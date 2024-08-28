import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { postData } from '../FetchNodeServices';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { errorMessage, isEmail, successMessage } from '../Checks';
import { ToastContainer } from 'react-toastify';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function UserLogin() {
    const history = useNavigate();
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(false);
    const [hexcode, setHexcode] = useState("");


    const handleClick = async () => {
        if (emailId === "") {
            errorMessage("Email should not be blank")
        }
        else if (!isEmail(emailId)) {
            errorMessage("Pls Filled Email correct form")
        }
        if (password === "") {
            errorMessage("Password should not be blank")
        }

        var body = { emailId: emailId, password: password };
        var result = await postData('user/checkuserlogin', body);
        if (result.result) {
            //sessionStorage.setItem('email', emailId)
            successMessage("This email and password are correct!")
            setTimeout(() => {
                setStatus(true);
            }, 1 * 1000)


            if (hexcode) {
                var hexres = await postData('user/checkhexcode', { hexcode: hexcode });
                if(hexres.result){
                    sessionStorage.setItem('email', emailId)
                    sessionStorage.setItem('hexcode', hexcode)
                    history('/userhome');
                }
                else{
                    errorMessage("Invalid hospital code!")
                }
            }
        }
        else {
            errorMessage("Invalid Email/Password!")
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

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(/user.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            User Login
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(event) => setEmailId(event.target.value)}
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
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <hr />

                            {status && (<TextField
                                style={{ backgroundColor: '#feeced' }}
                                margin="normal"
                                required
                                fullWidth
                                name="hexcode"
                                label="Enter Hospital Code"
                                type="hexcode"
                                id="hexcode"
                                autoComplete="current-password"
                                onChange={(e) => setHexcode(e.target.value)}

                            />)}

                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => handleClick()}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="" variant="body2" to="/userforget">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2" to="/userregister">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>

                            <ToastContainer />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}