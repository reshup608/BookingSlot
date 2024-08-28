import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import "./Home.css";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export default function Home() {
    const theme = useTheme();
    const history=useNavigate();
    const [loading, setLoading] = React.useState(true);
    const [second, setSecond] = React.useState(true);

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(false);

        }, 1000);

        const secondout = setTimeout(() => {
            setSecond(false)
        }, 3000);

        return () => {
            clearTimeout(timeoutId);
            clearTimeout(secondout)
        };

    }, []);

    return (<div style={{ backgroundColor: '#990ac9', color: 'white', height: '100vh', width: '100vw' }}>
        {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress size={45} sx={{
                    color: 'white',
                    margin: '18%', // default margin for desktop view
                    [`${theme.breakpoints.down('sm')}`]: { // media query for mobile view (max-width: 600px)
                        marginTop: '70%',
                    },
                    [`${theme.breakpoints.down('xs')}`]: { // media query for extra small mobile view (max-width: 400px)
                        margin: '50%',
                    },
                }} />
            </div>) : (

            <>
                {second ? (<div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Helvetica', fontWeight: 650, fontSize: 25, height: '80vh' }}>
                        <div>Booking.Com</div><br />
                    </div>

                    <Typography sx={{ display: { xs: 'none', md: 'flow', marginTop: '-200px' } }}>
                        <div className="loader">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                    </Typography>
                    <Typography sx={{ display: { xs: 'block', md: 'none', marginTop: '-270px' } }}>
                        <div className="loader">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                    </Typography>
                </div>) : (
                    <div>
                        <Typography style={{padding:'190px 0px'}} sx={{ display: { xs: 'none', md: 'flow' } }}>
                            <div style={{display: 'flex', justifyContent: 'center'}}><HowToRegIcon sx={{fontSize:38}}/></div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Helvetica', fontWeight: 650, fontSize: 25,marginBottom:'20px' }}>Booking.Com</div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button variant="outlined" sx={{
                            color: 'white',
                            borderColor: 'white',
                            borderWidth: 2,
                            fontSize: 16,
                            padding: '9px 24px',
                            borderRadius: 10,
                            width:'280px'
                        }}
                        onClick={()=>history('/adminlogin')}
                        >Admin Login</Button></div>
                        <br/>
                        <div style={{display: 'flex', justifyContent: 'center',marginTop:'-9px'}}>
                            <Button variant="outlined" sx={{
                            color: 'white',
                            borderColor: 'white',
                            borderWidth: 2,
                            fontSize: 16,
                            padding: '9px 24px',
                            borderRadius: 10,
                            width:'280px'
                        }}
                        onClick={()=>history('/userlogin')}
                        >User Login</Button>
                        </div>
                        </Typography>


                        <Typography style={{padding:'270px 0px'}} sx={{ display: { xs: 'block', md: 'none'} }}>
                        <div style={{display: 'flex', justifyContent: 'center'}}><HowToRegIcon sx={{fontSize:40}}/></div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Helvetica', fontWeight: 650, fontSize: 25,marginBottom:'20px' }}>Booking.Com</div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button variant="outlined" sx={{
                            color: 'white',
                            borderColor: 'white',
                            borderWidth: 2,
                            fontSize: 16,
                            padding: '9px 25px',
                            borderRadius: 10,
                            width:'240px'
                        }}
                        onClick={()=>history('/adminlogin')}
                        >Admin Login</Button></div>
                        <br/>
                        <div style={{display: 'flex', justifyContent: 'center',marginTop:'-10px'}}>
                            <Button variant="outlined" sx={{
                            color: 'white',
                            borderColor: 'white',
                            borderWidth: 2,
                            fontSize: 16,
                            padding: '9px 25px',
                            borderRadius: 10,
                            width:'240px'
                        }}
                        onClick={()=>history('/userlogin')}
                        >User Login</Button>
                        </div>
                        </Typography>
                    </div>)}

            </>

        )}

    </div>)
}