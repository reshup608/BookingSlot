import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { postData } from '../FetchNodeServices';
import DoctorData from './DoctorData';
import MenuList from '@mui/material/MenuList';
import { Link } from 'react-router-dom';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DrawerData from './DrawerData';
import Footer from './Footer';




// const SearchBar = ({searchTerm,handleChange}) => {


//     return (
//         <div className='relative' > {/* Use w-full for responsive search bar */}
//             <input
//                 type="text"
//                 id="search"
//                 className="w-72 rounded-md border border-gray-400 bg-white text-black pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 rounded-s-full rounded-e-full dark:bg-gray-500 dark:text-slate-200"
//                 placeholder="Search..."
//                 value={searchTerm}
//                 onChange={handleChange}
//             />
//             <span className="absolute inset-y-0 left-0 flex items-center pl-3.5">
//                 <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                 </svg>
//             </span>
//         </div>
//     );
// };

const darkTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#990ac8',
        },
    },
});

function UserHome() {

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const emailId = sessionStorage.getItem('email');
    const [firstName, setFirstName] = React.useState("");
    const [direction, setDirection] = React.useState(false);
    const history = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [status, setStatus] = useState(false);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value !== "") {
            setStatus(false);
          }
    };

    const fetchFirstName = async () => {
        var body = { emailId: emailId }
        var res = await postData('user/fetchfirstname', body);
        setFirstName(res.data[0].firstName);

    }

    React.useEffect(() => {
        fetchFirstName()
    })

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('email')
        history('/userlogin');
    }


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleDrawer = () => {
        setDirection(false)
    }

    const handleSearch = () => {
        setStatus(true)
    };

    return (
        <div
        >
            <ThemeProvider theme={darkTheme}>
                <AppBar position="static" >
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <div>
                                <div style={{ marginTop: '10px' }}>
                                    <div><span className='dark:text-slate-200' style={{ fontFamily: 'sans-serif' }}><span style={{ fontSize: 14 }}>Hello {firstName}&nbsp;👋</span></span>
                                    </div>
                                    <p className='dark:text-slate-400' style={{ fontSize: 16, marginTop: '-3px', fontWeight: 650 }}>How are you doing now?</p>
                                </div>

                                <div className="flex h-20 items-center justify-start" style={{ marginTop: '-3px' }}> {/* Use flex for responsive layout (optional) */}
                                    {/* SearchBar */}
                                    <div className='relative' > {/* Use w-full for responsive search bar */}
                                        <input
                                            type="text"
                                            id="search"
                                            className="w-72 rounded-md border border-gray-400 bg-white text-black pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 rounded-s-full rounded-e-full dark:bg-gray-500 dark:text-slate-200"
                                            placeholder="Search..."
                                            value={searchTerm}
                                            onChange={handleChange}
                                        />
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5">
                                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    </div>


                                    <button
                                        type="button"
                                        className="w-9 h-9 m-2 rounded-full bg-cyan-400  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-100"

                                        onClick={handleSearch}

                                    >
                                        <SearchIcon className="w-5 h-5 text-slate-100 mx-auto" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>

                            <Box sx={{ flexGrow: 1 }} style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-63px' }}>
                                <Tooltip title="Notification">
                                    <div style={{ display: 'flex', marginTop: '4.5px', marginRight: '8px' }}>
                                        <div style={{ height: '5px', width: '5px', backgroundColor: 'red', borderRadius: '50%', border: '1px solid red', display: 'inline-block', position: 'relative', top: '2px', right: '-24px' }}></div>
                                        <div><NotificationsIcon style={{ color: 'white', fontSize: '23px' }} onClick={() => setDirection(true)} /></div>
                                    </div>
                                </Tooltip>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar style={{ height: '38px', width: '38px', backgroundColor: 'gray' }} alt={firstName} src="/static/images/avatar/2.jpg" />
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
                                        <MenuItem component={Link} to="/userprofile">
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
                    <br />
                </AppBar>
            </ThemeProvider>

            {!status?(<DoctorData searchTerm={""} />):(
                <DoctorData searchTerm={searchTerm} />
            )}
            <div style={{ marginTop: 35 }}>
                <Footer />
            </div>
            <DrawerData direction={direction} onUpdate={handleDrawer} />
        </div>

    );
}
export default UserHome;
