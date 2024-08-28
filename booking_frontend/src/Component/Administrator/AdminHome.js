import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import MenuList from '@mui/material/MenuList';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControl from '@mui/material/FormControl';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import dayjs from 'dayjs';
import { isEmpty, errorMessage, successMessage } from '../Checks';
import { postData } from '../FetchNodeServices';
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import Doctors from './Doctors';
import { useLocation } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Records from './Records';


function AdminHome() {
    const location = useLocation();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [doctorName, setDoctorName] = React.useState("");
    const [doctorType, setDoctorType] = React.useState("");
    const [startTime, setStartTime] = React.useState("10:00");
    const [endTime, setEndTime] = React.useState("10:00");
    const [shift, setShift] = React.useState("");
    const [duration, setDuration] = React.useState(dayjs('Sun Apr 17 2022 00:30:00 GMT+0530'));
    const emailId = sessionStorage.getItem('email');
    const [isOpen, setIsOpen] = React.useState(location.state);
    const [code, setCode] = React.useState("");
    const [status, setStatus] = React.useState(false);


    const closeNotify = () => {
        setIsOpen(false);
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(code);
        setIsOpen(false);
        successMessage("Copied Code!")
    };

    const history = useNavigate();

    const fetchHexcode = async () => {
        var body = { emailId: emailId }
        var res = await postData('admin/fetchhexcode', body);
        setCode(res.data[0].hexcode);
        sessionStorage.setItem('hexcode',res.data[0].hexcode)
    }

    React.useEffect(() => {
        fetchHexcode();
    })
    const NotifyDialog = () => {
        return (
            <div>
                {isOpen && (
                    <div className="notify-dialog">
                        <div class="w-full max-w-sm">
                            <div class="mb-2 flex justify-between items-center">
                                <label for="website-url" class="text-sm font-medium text-gray-900 dark:text-white">Your Hospital Code:</label>
                            </div>
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


                                <div id="tooltip-website-url" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    <span id="default-tooltip-message">Copy link</span>
                                    <span id="success-tooltip-message" class="hidden">Copied!</span>
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </div>
                            <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">This code is required for User Login</p>
                        </div>

                        <button className="close-btn" onClick={closeNotify} style={{ marginTop: '-10px' }}>
                            <ClearIcon sx={{ fontSize: '18px' }} />
                        </button>
                    </div>
                )}


            </div>
        )
    }


    const handleClick = async () => {
        var err = false;
        if (isEmpty(doctorName)) {
            err = true;
            errorMessage("Doctor Name should not be blank.");
        }
        if (isEmpty(doctorType)) {
            err = true;
            errorMessage("Specialization should not be blank.");
        }
        if (isEmpty(shift)) {
            err = true;
            errorMessage("Shift should not be blank.");
        }
        const string = duration.$d;
        const dur = string.toString().slice(16, 21);
        if (!err) {
            var body = { doctorName: doctorName, doctorType: doctorType, shift: shift, startTime: startTime, endTime: endTime, duration: dur, emailId: emailId };
            var res = await postData('doctor/insertdata', body);
            if (res.result) {
                successMessage("Record Submitted Successfully!")
                setOpen(false);
            }
            else {
                Swal.fire({
                    imageUrl: '/pharmacy.png',
                    imageWidth: 200,
                    title: 'Booking.com',
                    text: 'Someting went wrong!',
                })
            }
        }
        else {
            Swal.fire({
                imageUrl: '/pharmacy.png',
                imageWidth: 200,
                title: 'Booking.com',
                text: 'Someting went wrong!',
            })
        }

    }


    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('email')
        history('/adminlogin');
    }


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
                            // onSubmit={handleSubmit}
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                m: 'auto',
                                width: 'fit-content',



                            }}

                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', flexDirection: 'column', margin: 'auto' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <DialogTitle><span style={{ fontFamily: 'sans-serif', color: '#6d6b6a', display: 'flex', justifyContent: 'center', padding: '0px' }}>Add Doctors</span></DialogTitle>
                            <FormControl sx={{ mt: 2, minWidth: 120 }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} >
                                        <TextField
                                            autoComplete="given-name"
                                            name="doctorName"
                                            required
                                            fullWidth
                                            id="doctorName"
                                            label="Doctor Name"
                                            autoFocus
                                            onChange={(e) => setDoctorName(e.target.value)}

                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField
                                            autoComplete="given-name"
                                            name="doctorType"
                                            required
                                            fullWidth
                                            id="doctorType"
                                            label="Specialization"
                                            autoFocus
                                            onChange={(e) => setDoctorType(e.target.value)}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        <TextField
                                            autoComplete="given-name"
                                            name="startType"
                                            required
                                            fullWidth
                                            id="startType"
                                            label="Start Time"
                                            type='time'
                                            autoFocus
                                            onChange={(e) => setStartTime(e.target.value)}
                                            value={startTime}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="endType"
                                            required
                                            fullWidth
                                            id="endType"
                                            label="End Time"
                                            autoFocus
                                            type='time'
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="shift"
                                            required
                                            fullWidth
                                            id="shift"
                                            label="Shift"
                                            autoFocus
                                            onChange={(e) => setShift(e.target.value)}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{ marginTop: '-8px' }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <DemoContainer components={['TimePicker']} >
                                                <TimeField
                                                    label="Duration"
                                                    defaultValue={dayjs('2022-04-17T00:30')}
                                                    format="HH:mm"
                                                    fullWidth
                                                    onChange={(e) => setDuration(e)}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>


                                <Button
                                    //type="submit"
                                    fullWidth
                                    variant="contained"
                                    style={{ marginTop: 12 }}
                                    sx={{ mt: 2, mb: 1 }}
                                    onClick={() => handleClick()}

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

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleDrawer = () => {
        setStatus(false)
    }


    return (<>
        <AppBar position="static" color='secondary'>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        DASHBOARD
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                        </Menu>
                    </Box>

                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        DASHBOARD
                    </Typography>


                    <Box sx={{ flexGrow: 1 }} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Tooltip title="Notification">
                            <div style={{ display: 'flex', marginTop: '2px', marginRight: '8px' }}>
                                <div style={{ height: '5px', width: '5px', backgroundColor: 'red', borderRadius: '50%', border: '1px solid red', display: 'inline-block', position: 'relative', top: '2px', right: '-24px' }}></div>
                                <div><NotificationsIcon style={{ color: 'white', fontSize: '25px' }} onClick={()=>setStatus(true)}  /></div>
                            </div>
                        </Tooltip>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={emailId.toUpperCase()} style={{width:'35px',height:'35px'}} src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            <MenuList onClick={handleCloseUserMenu}>
                                <MenuItem component={Link} to="/profile">
                                    <ListItemText>Profile</ListItemText>
                                </MenuItem>
                                <MenuItem style={{ marginTop: '-6px' }} onClick={() => handleLogout()}>
                                    <ListItemText>Logout</ListItemText>
                                </MenuItem>
                            </MenuList>

                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

        <Doctors />

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '25px', marginBottom: '20px', position: 'sticky', right: 0, bottom: 55 }}>
            <button
                style={{ backgroundColor: '#a03cc3', border: 'none', borderRadius: '50%', cursor: 'pointer', padding: '12px', transition: '#fff 0.2s' }}
                aria-label="Compose"
                onClick={() => setOpen(true)}
            >
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFF"
                    strokeWidth="2"
                >
                    <path d="M12 5v14M5 12h14" />
                </svg>
            </button>
        </div>
        <Records status={status} onUpdate={handleDrawer}/>
        <div>{storeDialog()}</div>
        <div>{NotifyDialog()}</div>
        <ToastContainer />


    </>
    );
}
export default AdminHome;
