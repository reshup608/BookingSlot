import React from 'react';
import { Container, Box, Link, Grid, Typography } from '@mui/material';
import { postData } from '../FetchNodeServices';

export default function Footer() {
  const [data, setData] = React.useState([]);

  const fetchadminDetail = async () => {
    var hexcode = sessionStorage.getItem('hexcode');
    var res = await postData('admin/fetchadminbyhexcode', { hexcode: hexcode });
    setData(res.data);
    
  };

  React.useEffect(() => {
    fetchadminDetail();
  }, []);

  return (
    <div>
      <footer style={{ backgroundColor: '#990ac8', padding: '20px' }}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom component="div" style={{color:'#f3f3f3'}}>
                GET IN TOUCH
                <br/>
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {/* Add social media links here */}
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {/* Responsive Grid for Content Sections */}
            {/* <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom component="div">
                GET IN TOUCH
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {/* Add social media links here */}
            {/* </div>
            </Grid> */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography gutterBottom component="div" style={{color:'#f3f3f3'}}>
                CONTACT US
              </Typography>
              <Box sx={{ color: '#f3f3f3', fontSize: '1em' }}>
                <Box component="p">hospital@example.com</Box>
                <Box component="p">+91 76172 87663</Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography gutterBottom component="div" style={{color:'#f3f3f3'}}>
                APPOINTMENT
              </Typography>
              <Box>
                <Link href="#" underline="none" sx={{ color: '#f3f3f3', fontSize: '1em' }}>
                  Book an Appointment
                </Link><br />
                <Link href="#" underline="none" sx={{ color: '#f3f3f3', fontSize: '1em' }}>
                  Cancel Appointment
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography  gutterBottom component="div" style={{color:'#f3f3f3'}}>
                ABOUT US
              </Typography>
              <Box>
                <Link href="#" underline="none" sx={{ color: '#f3f3f3', fontSize: '1em' }}>
                  Our Hospital
                </Link><br />
                <Link href="#" underline="none" sx={{ color: '#f3f3f3', fontSize: '1em' }}>
                  Our Doctors
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography  gutterBottom component="div" style={{color:'#f3f3f3'}}>
                HELP
              </Typography>
              <Box>
                <Link href="#" underline="none" sx={{ color: '#f3f3f3', fontSize: '1em' }}>
                  FAQs
                </Link><br />
                <Link href="#" underline="none" sx={{ color: '#f3f3f3', fontSize: '1em' }}>
                  Contact Support
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </div>
  );
}
