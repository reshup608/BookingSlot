import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { postData } from '../FetchNodeServices';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { successMessage } from '../Checks';
import { ToastContainer } from 'react-toastify';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControl from '@mui/material/FormControl';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import dayjs from 'dayjs';
import { isValidDate,isEmpty,errorMessage,isDigits } from '../Checks';
import Swal from 'sweetalert2';

export default function DrawerData(props) {

    const [isOpen, setIsOpen] = React.useState(false);
    const [list1, setList1] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [slotId, setSlotId] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [mobileno, setMobileno] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [value, setValue] = React.useState(new Date());
    const [bookDate, setBookDate] = React.useState(dayjs(value).add(0, 'day').format('YYYY-MM-DD'));
    const [slot, setSlot] = React.useState(dayjs(''));
    const [description, setDescription] = React.useState("")
    const moment = require('moment-timezone');
    const [isFormDirty, setIsFormDirty] = React.useState(false);
    const [doctorId, setDoctorId] = React.useState("");


    const handleClick = () => {
        props.onUpdate();
    }

    const handleClose1 = () => {
        setDeleteOpen(false)
    }

    const handleClose = () => {
        setOpen(false);

    };

    const fetchData = async () => {
        var hexcode = sessionStorage.getItem('hexcode')
        var result = await postData('slots/fetchslotsbyhexcode', { hexcode: hexcode })
        setData(result.data)
        //console.log(result.data)
    }

    const handleDelete = (slotId) => {
        setDeleteOpen(true)
        setSlotId(slotId)
        
    }

    const handleEdit = async(slotId,doctorId) => {
        setOpen(true)
        setSlotId(slotId)
        setDoctorId(doctorId)

        var res = await postData('slots/fetchslotsbyid', {slotId: slotId} )
        setList1(res.data)
        setFirstName(res.data[0].firstName)
        setLastName(res.data[0].lastName)
        setMobileno(res.data[0].mobileno)
        setAddress(res.data[0].address)
        setValue(moment(res.data[0].bookDate).tz('Asia/Kolkata').format('YYYY-MM-DD'))
        setSlot(res.data[0].timeSlot)
        setDescription(res.data[0].description)
    }

    const handleBook = async() => {
        
       
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
        
        if(!err){
            var body = {slotId:slotId,firstName:firstName,lastName:lastName,address:address,mobileno:mobileno,bookDate: value,timeSlot:slot,description:description,doctorId:doctorId,hexcode:hexcode};
            var res = await postData('slots/editslot', body);
            if (res) {
                setOpen(false)
                Swal.fire({
                    imageUrl: '/pharmacy.png',
                    imageWidth: 200,
                    title: 'Booking.com',
                    text: 'Record Updated Successfully',
                })
                setTimeout(() => {
                    window.location.reload();
                }, 1 * 1000);
            }
            else {
                setOpen(false)
                Swal.fire({
                    imageUrl: '/pharmacy.png',
                    imageWidth: 200,
                    title: 'Booking.com',
                    text: 'Something went wrong',
                })
            }

        }

    }

    React.useEffect(() => {
        if (props.direction) {
            setIsOpen(props.direction)
        }
        handleClick();
        fetchData();

        if (slot.$d === undefined) {

            setSlot(slot);
        }
        else {
            const string = slot.$d;
            const dur = string.toString().slice(16, 21);
            setSlot(dur);
        }
      
        

    }, [props.direction,open,slot,slotId,bookDate,value])

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
                            <DialogTitle><span style={{ fontFamily: 'sans-serif', color: '#6d6b6a', display: 'flex', justifyContent: 'center', padding: '0px', marginTop: '-10px' }}>Edit Slots</span></DialogTitle>
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
                                            onChange={(e) => setFirstName(e.target.value) || setIsFormDirty(true)}
                                            value={firstName}
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
                                            onChange={(e) => setLastName(e.target.value) || setIsFormDirty(true)}
                                            value={lastName}
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
                                            onChange={(e) => setMobileno(e.target.value) || setIsFormDirty(true)}
                                            value={mobileno}
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
                                            onChange={(e) => setAddress(e.target.value) || setIsFormDirty(true)}
                                            value={address}
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
                                            onChange={(e)=>setBookDate(e.target.value) || setValue(e.target.value) || setIsFormDirty(true)}
                                            value={value}
                                           
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
                                                    required
                                                    //value={dayjs('2022-04-17T' + `${slot}`)}
                                                    onChange={(e)=>setSlot(e) || setIsFormDirty(true)}
                                                   
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
                                            onChange={(e) => setDescription(e.target.value) || setIsFormDirty(true)}
                                            value={description}
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
                                    disabled={!isFormDirty}
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


    const DeleteDialog = () => {
        return (
            <div>
                <Dialog
                    open={deleteOpen}
                    onClose={handleClose1}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this slot?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
                        <Button onClick={async () => {
                            await postData('slots/deleteslotsbyslotId', { slotId: slotId });
                            successMessage('Slot Deleted Sccessfully!')
                            setDeleteOpen(false);
                        }} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsOpen(open)
    };

    const list = (anchor) => (
        // ... your list content
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 290 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <div style={{ marginLeft: '20px',marginTop:'12px'}}>
                <div  style={{fontSize:'19px'}} className="font-medium text-gray-900">Appointments</div>
                <div className="mt-8" >
                    <div style={{display:'flex'}}>
                    {data.length === 0 ? (
                            <div style={{display:'flex',justifyContent:'center',marginTop:'50%',marginLeft:'25%'}}>
                                <p>No records found.</p>
                            </div>
                        ) : (
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {data.map((item) => (
                        <li key={item.slotId} className="py-4" style={{boxShadow: '2px 2px 2px 0px rgba(153, 10, 200, 0.8)',transition: '0.3s',padding:'10px',backgroundColor:'#f7f7f7',margin:'5px',borderRadius:'6px',marginBottom:'10px'}}>
                        <div><span style={{fontFamily:'sans-serif',fontWeight:'550',fontSize:'14px'}}>Patient Name: </span><span style={{fontSize:'15px',fontFamily:'sans-serif'}}>{`${item.firstName} ${item.lastName}`}</span></div>
                        <div><span style={{fontFamily:'sans-serif',fontWeight:'550',fontSize:'14px'}}>Slot Timing: </span><span style={{fontSize:'15px',fontFamily:'sans-serif'}}>{moment(item.bookDate).tz('Asia/Kolkata').format('YYYY-MM-DD')}&nbsp;({item.timeSlot.slice(0,5)})</span></div>
                        <div><span style={{fontFamily:'sans-serif',fontWeight:'550',fontSize:'14px'}}>Mobile No: </span><span style={{fontSize:'15px',fontFamily:'sans-serif'}}>{item.mobileno}</span></div>
                        <Button
                            variant="contained"
                            color="primary"
                            //size="small"
                            //onClick={() => handleEdit(item)}
                            sx={{
                                marginTop: 1,
                                marginRight: 1,
                                height:'30px',
                                fontSize:'11px'
                                
                            }}
                        onClick={() => handleEdit(item.slotId,item.doctorId)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            //size="small"
                            sx={{
                                marginTop: 1,
                                height:'30px',
                                marginLeft:'60px',
                                fontSize:'11px'
                            }}
                        onClick={() => handleDelete(item.slotId)}
                        >
                            Delete
                        </Button>
                        </li>))}
                        </ul>
                        )}
                    </div>
                </div>
            </div>
            <br/>
            
            
        </Box>
    );

    return (
        <div>
            <Drawer
                anchor={'right'}
                open={isOpen}
                onClose={toggleDrawer(false)}
            >
                {list('right')}
            </Drawer>
            {DeleteDialog()}
            {storeDialog()}
            <div><ToastContainer/></div>
        </div>
    );
}
