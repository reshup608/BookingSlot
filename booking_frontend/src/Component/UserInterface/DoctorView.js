import React, { useEffect, useState } from "react";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useLocation } from "react-router-dom";
import { postData } from "../FetchNodeServices";
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import FormControl from '@mui/material/FormControl';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { errorMessage, isDigits, isEmpty, isValidDate, successMessage } from "../Checks";
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tooltip from '@mui/material/Tooltip';
import DrawerData from "./DrawerData";


function appBarLabel(setDirection) {
    return (
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <span style={{ marginBottom: '20px', marginLeft: '-6px' }}><Link to='/userhome'>&nbsp;<ArrowBackIcon to='/app' color="white" /></Link>&nbsp;</span>
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                <div style={{ padding: 2, marginBottom: '12px', fontSize: 20, fontFamily: 'sans-serif', marginRight: '35px', fontWeight: '510' }}><span style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>Appointments</span></div>
            </Typography>
            <Tooltip title="Notification">
            <Box sx={{ flexGrow: 0 }} style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-15px', marginLeft: '0px' }}>
                <div style={{ height: '5px', width: '5px', backgroundColor: 'red', borderRadius: '50%', border: '1px solid red', display: 'inline-block', position: 'relative', top: '2px', right: '-24px' }}></div>
                <div><NotificationsIcon style={{ color: 'white', fontSize: '22px' }} onClick={() => setDirection(true)} /></div>
            </Box>
            </Tooltip>
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

const DemoPaper = styled(Paper)(({ theme, status }) => ({
    width: 60,
    height: 75,
    padding: theme.spacing(1),
    ...theme.typography.body2,
    textAlign: 'center',
    cursor: 'pointer',
    outlineColor: status ? 'black' : '#1b8ce4',
    outline: status ? 'solid #990ac8' : 'black',
    color: status ? '#990ac8' : 'black',
    fontWeight: '470',
    fontSize: '15px'

}));

const TimeBox = styled(Paper)(({ status }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '105px',
    height: '40px',
    padding: '10px',
    border: '1.5px solid #990ac8',
    margin: '8px',
    color: !status ? '#990ac8' : 'white',
    backgroundColor: !status ? 'white' : '#c568e1',
    // backgroundColor: !status ? 'white' : (mark ? 'red' : '#c568e1'),
    //color: !status ? '#990ac8' : mark ? 'white' : 'white',
    //backgroundColor: status ? mark ? 'red' : '#c568e1' : 'white',

}))

export default function DoctorView() {
    const location = useLocation();
    const [doctorId, setDoctorId] = useState(location.state);
    const [doctors, setDoctors] = useState([]);
    const [value, setValue] = useState(new Date());
    const [bookDate, setBookDate] = useState(dayjs(value).add(0, 'day').format('YYYY-MM-DD'));
    const [activeIndex, setActiveIndex] = useState(0);
    const [startHour, setStartHour] = useState("");
    const [endHour, setEndHour] = useState("");
    const [startMin, setStartMin] = useState("");
    const [timeSlots, setTimeSlots] = useState([]);
    const [timeIndex, setTimeIndex] = useState(-1);


    const [mark, setMark] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [checkSlots, SetCheckSlots] = useState([]);
    const [slot, setSlot] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobileno, setMobileno] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("")
    const moment = require('moment-timezone');
    const history = useNavigate();
    const [direction, setDirection] = React.useState(false);


    const fetchAllDoctors = async () => {
        var res = await postData('doctor/fetchdoctorbyid', { doctorId: doctorId })
        setDoctors(res.data);
    }

    const fetchSlots = async () => {
        var res = await postData('slots/fetchslots', { doctorId: doctorId });
        SetCheckSlots(res.data);
    }

    const createTimeSlots = () => {
        const startTimeParts = doctors[0].startTime.split(':')
        const endTimeParts = doctors[0].endTime.split(':')
        setStartMin(parseInt(startTimeParts[1]))
        if (startTimeParts[0] < "12" && startTimeParts[0] > "1") {
            setStartHour(parseInt(startTimeParts[0]))
        }
        if (startTimeParts[0] === "0" || startTimeParts[0] === "12") {
            setStartHour(parseInt("12"))
        }
        if (startTimeParts[0] > "12") {
            setStartHour(parseInt(startTimeParts[0] - 12))
        }

        if (endTimeParts[0] < "12" && endTimeParts[0] > "1") {
            setEndHour(parseInt(endTimeParts[0]))
        }
        if (endTimeParts[0] === "0") {
            setEndHour(parseInt("12"))
        }
        if (endTimeParts[0] > "12") {
            setEndHour(parseInt(endTimeParts[0] - 12))
        }

        const timeSlotsArray = [];
        for (let hour = startHour; hour <= endHour; hour++) {
            for (let minute = startMin; minute < 60; minute += parseInt(doctors[0].duration.slice(3, 5))) {
                const timeSlot = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                timeSlotsArray.push(timeSlot);
            }
        }

        if (startHour > endHour) {

            for (let hour = startHour; hour <= 12; hour++) {
                for (let minute = startMin; minute < 60; minute += parseInt(doctors[0].duration.slice(3, 5))) {
                    const timeSlot = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                    timeSlotsArray.push(timeSlot);
                }
            }

            if (timeSlotsArray.length > 1) {

                for (let hour = 1; hour <= endHour; hour++) {
                    for (let minute = startMin; minute < 60; minute += parseInt(doctors[0].duration.slice(3, 5))) {
                        const timeSlot = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                        timeSlotsArray.push(timeSlot);
                    }
                }
            }
        }
        setTimeSlots(timeSlotsArray);

    }

    const isBooked = (timeSlot) => {
        //moment(slot.bookDate).tz('Asia/Kolkata').format('YYYY-MM-DD')
        return checkSlots.some(slot => slot.timeSlot.slice(0, 5) === timeSlot && moment(slot.bookDate).tz('Asia/Kolkata').format('YYYY-MM-DD') === bookDate)
    }

    const handleBook = async () => {

        var err = false;
        if (!isValidDate(bookDate)) {
            err = true;

            errorMessage("Please select Book Date")
        }
        if (isEmpty(slot)) {
            err = true;

            errorMessage("Please select Time Slot")
        }
        if (isEmpty(firstName)) {
            err = true;

            errorMessage("First Name should not be blank.")
        }
        if (isEmpty(lastName)) {
            err = true;

            errorMessage("Last Name should not be blank.")
        }
        if (isEmpty(address)) {
            err = true;

            errorMessage("Address should not be blank.")
        }
        if (isEmpty(description)) {
            err = true;

            errorMessage("Description should not be blank.")
        }
        if (!isDigits(mobileno)) {
            err = true;

            errorMessage("Mobileno should not be blank.")
        }
        var hexcode = sessionStorage.getItem('hexcode');
        if (!err) {
            var body = { firstName: firstName, lastName: lastName, address: address, mobileno: mobileno, bookDate: bookDate, timeSlot: slot, description: description, doctorId: doctorId,hexcode: hexcode };
            var res = await postData('slots/insertdata', body);
            if (res.result) {
                successMessage("Your slot has been booked successfully!")
                setTimeout(() => {
                    setOpen(false);
                    history(0);
                }, 1 * 1000);
            }
            else {
                Swal.fire({
                    imageUrl: '/pharmacy.png',
                    imageWidth: 200,
                    title: 'Booking.com',
                    text: 'Something Went Wrong!',

                })
            }
        }
    }

    useEffect(() => {

        fetchAllDoctors();
        if (doctors.length > 0) {
            createTimeSlots();
        }
        fetchSlots();

        //console.log(mark)
        // if (checkSlots.length) {
        //     checkStatus()
        // }

    }, [bookDate, timeIndex, slot, mark, doctors])



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
                            //onSubmit={handleSubmit}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                m: 'auto',
                                width: 'fit-content'

                            }}

                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', flexDirection: 'column', margin: 'auto' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <DialogTitle><span style={{ fontFamily: 'sans-serif', color: '#6d6b6a', display: 'flex', justifyContent: 'center', padding: '0px', marginTop: '-10px' }}>Book Slots</span></DialogTitle>
                            <FormControl sx={{ mt: 0, minWidth: 120 }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={6} >
                                        <TextField
                                            autoComplete="given-name"
                                            name="firstName"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                            onChange={(e) => setFirstName(e.target.value)}
                                        //value={doctorName}
                                        //onChange={(e) => (setDoctorName(e.target.value) || setIsFormDirty(true))}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="lastName"
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            autoFocus
                                            onChange={(e) => setLastName(e.target.value)}
                                        //value={doctorType}
                                        //onChange={(e) => (setDoctorType(e.target.value) || setIsFormDirty(true))}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        <TextField
                                            autoComplete="given-name"
                                            name="mobileno"
                                            required
                                            fullWidth
                                            id="mobileno"
                                            label="Mobile No"
                                            onChange={(e) => setMobileno(e.target.value)}
                                            autoFocus
                                        //onChange={(e) => (setStartTime(e.target.value) || setIsFormDirty(true))}
                                        //value={startTime}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="address"
                                            required
                                            fullWidth
                                            id="address"
                                            label="Address"
                                            autoFocus
                                            onChange={(e) => setAddress(e.target.value)}
                                        //value={endTime}
                                        //onChange={(e) => (setEndTime(e.target.value) || setIsFormDirty(true))}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="bookDate"
                                            required
                                            fullWidth
                                            id="bookDate"
                                            label="Book Date"
                                            autoFocus
                                            type="date"
                                            value={bookDate}

                                            readOnly
                                        //value={shift}
                                        //onChange={(e) => (setShift(e.target.value) || setIsFormDirty(true))}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{ marginTop: '-8px' }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <DemoContainer components={['TimePicker']} >
                                                <TimeField
                                                    label="Slot"
                                                    defaultValue={dayjs('2022-04-17T' + `${slot}`)}
                                                    format="HH:mm"
                                                    fullWidth
                                                    readOnly
                                                    required

                                                //onChange={(e) => (setDuration(e) || setIsFormDirty(true))}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="description"
                                            required
                                            fullWidth
                                            id="description"
                                            label="Description"
                                            autoFocus
                                            multiline
                                            rows={4}
                                            onChange={(e) => setDescription(e.target.value)}
                                        //value={shift}
                                        //onChange={(e) => (setShift(e.target.value) || setIsFormDirty(true))}

                                        />
                                    </Grid>
                                </Grid>


                                <Button

                                    fullWidth
                                    variant="contained"
                                    style={{ marginTop: 12 }}
                                    color="secondary"
                                    sx={{ mt: 2, mb: 1, backgroundColor: '#990ac8', color: 'white' }}
                                    onClick={() => handleBook()}

                                >
                                    Submit
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


    const handleDrawer = () => {
        setDirection(false)
    }


    return (
        <div>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <ThemeProvider theme={darkTheme}>
                    <AppBar position="static" color="primary" style={{ height: '50px' }}>
                        {appBarLabel(setDirection)}
                    </AppBar>
                </ThemeProvider>
            </Stack>

            {doctors.map((item) => (<div style={{ marginTop: '36px', marginLeft: '28px', marginRight: '28px' }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}><Avatar style={{ backgroundColor: '#9572b2', width: '210px', height: '210px', fontSize: '78px' }} alt={item.doctorName} src="/static/images/avatar/2.jpg" /></div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <div style={{ marginTop: '18px' }}>
                            <Typography
                                //variant="h6"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex', marginLeft: '-50px' },
                                    fontFamily: 'aerial',
                                    fontWeight: 400,
                                    letterSpacing: '.0rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    fontSize: '22px'
                                }}

                            >
                                <div>Dr. {item.doctorName}&nbsp;<br /><span style={{ fontWeight: '100', color: 'gray', fontSize: '18px' }}>({item.doctorType})</span><span style={{ marginLeft: '-178px', fontSize: '15px', color: 'gray', fontWeight: '100' }}><br />{item.startTime.slice(0, 5)}&nbsp;&nbsp;-&nbsp;&nbsp;{item.endTime.slice(0, 5)}</span></div>

                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <Menu
                                    id="menu-appbar"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}

                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                </Menu>
                            </Box>

                            <Typography
                                //variant="h5"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none', justifyContent: 'center' },
                                    flexGrow: 1,
                                    fontFamily: 'aerial',
                                    fontWeight: 400,
                                    letterSpacing: '.0rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    fontSize: '24px'
                                }}

                            >
                                <div>Dr. {item.doctorName}&nbsp;<span style={{ fontSize: '19px', fontWeight: '100', color: 'gray' }}>({item.doctorType})</span></div>
                            </Typography>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <div style={{ marginTop: '23px' }}>
                            <Typography sx={{ display: { md: 'flex', marginLeft: '101px' } }}>
                                <div style={{ marginLeft: '15px', fontSize: '20px', marginTop: '10px', fontFamily: 'aerial', fontWeight: '400' }}>Select Schedule</div>
                            </Typography>
                            <Typography sx={{ display: { md: 'flex', justifyContent: 'center' } }}>
                                <Stack direction="row" spacing={2} style={{ marginTop: '14px', marginLeft: '15px', marginRight: '25px' }}>
                                    {Array(5).fill(0).map((_, index) => (
                                        <DemoPaper
                                            key={index}
                                            square={false}
                                            status={activeIndex === index}
                                            onClick={() => {
                                                const date = dayjs(value).add(index, 'day').format('YYYY-MM-DD');
                                                setBookDate(date)
                                                setActiveIndex(index)
                                            }}
                                        >
                                            <div style={{ marginTop: '4px' }}>
                                                {dayjs(value).add(index, 'day').format('ddd')}
                                            </div>
                                            <div style={{ marginTop: '2px', fontFamily: 'aerial' }}>
                                                {value.getDate() + index}
                                            </div>
                                        </DemoPaper>))}

                                </Stack>
                            </Typography>
                        </div>
                    </Grid>


                    <Grid item xs={12} sm={6} >
                        <Typography sx={{ display: { xs: 'none', md: 'flow', marginLeft: '-65px' } }}>
                            <div style={{ marginRight: '80px' }}>
                                <Typography sx={{ display: { md: 'flex', justifyContent: 'flex-start' } }}>
                                    <div style={{ marginLeft: '15px', fontSize: '20px', marginTop: '25px', fontFamily: 'aerial', fontWeight: '520', color: '#990ac8' }}>Available Slots</div>
                                </Typography>
                                <Typography>
                                    <div style={{ marginTop: '7px' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '2px' }}>
                                            {timeSlots.slice(0, -1).map((timeSlot, index) => (
                                                <TimeBox key={index} status={timeIndex === index} mark={isBooked(timeSlot)} onClick={() => {

                                                    if (isBooked(timeSlot)) {
                                                        setMark(true)
                                                    }
                                                    else {
                                                        setMark(false)
                                                    }
                                                    setSlot(timeSlot)
                                                    setTimeIndex(index)
                                                }}

                                                    style={{
                                                        backgroundColor: isBooked(timeSlot) ? 'red' : '',
                                                        color: isBooked(timeSlot) ? 'white' : '',
                                                        border: isBooked(timeSlot) ? '1.5px solid #b6092e' : '',
                                                    }}

                                                >
                                                    <div>{timeSlot}</div>
                                                </TimeBox>
                                            ))}
                                        </div>
                                    </div>
                                </Typography>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '11px', marginBottom: '5px', marginLeft: '8px', marginRight: '80px' }}>
                                <Button variant="contained"
                                    disabled={mark}
                                    onClick={() => setOpen(true)} color="secondary" fullWidth
                                    sx={{ backgroundColor: '#990ac8', color: 'white', borderRadius: '5px', fontSize: '15px' }}>
                                    Book Appointment
                                </Button>
                            </div>
                        </Typography>

                        <Typography sx={{ display: { xs: 'block', md: 'none' } }}>
                            <div style={{ marginRight: '20px' }}>
                                <Typography sx={{ display: { md: 'flex', justifyContent: 'flex-start' } }}>
                                    <div style={{ marginLeft: '15px', fontSize: '20px', marginTop: '25px', fontFamily: 'aerial', fontWeight: '520', color: '#990ac8' }}>Available Slots</div>
                                </Typography>
                                <Typography>
                                    <div style={{ marginTop: '7px' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '2px' }}>
                                            {timeSlots.slice(0, -1).map((timeSlot, index) => (
                                                <TimeBox key={index} status={timeIndex === index} mark={isBooked(timeSlot)} onClick={() => {

                                                    if (isBooked(timeSlot)) {
                                                        setMark(true)
                                                    }
                                                    else {
                                                        setMark(false)
                                                    }
                                                    setSlot(timeSlot)
                                                    setTimeIndex(index)
                                                }}
                                                    style={{
                                                        backgroundColor: isBooked(timeSlot) ? 'red' : '',
                                                        color: isBooked(timeSlot) ? 'white' : '',
                                                        border: isBooked(timeSlot) ? '1.5px solid #b6092e' : '',
                                                    }}
                                                >

                                                    <div>{timeSlot}</div>
                                                </TimeBox>
                                            ))}
                                        </div>
                                    </div>
                                </Typography>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '11px', marginBottom: '5px' }}>
                                <Button variant="contained"
                                    disabled={mark}
                                    onClick={() => setOpen(true)} color="secondary" fullWidth
                                    sx={{ backgroundColor: '#990ac8', color: 'white', borderRadius: '5px', fontSize: '15px' }}
                                >
                                    Book Appointment
                                </Button>
                            </div>
                        </Typography>

                    </Grid>

                </Grid>
            </div>))}
            <div>{storeDialog()}</div>
            <DrawerData direction={direction} onUpdate={handleDrawer}/>
            <ToastContainer />
        </div>
    )
}