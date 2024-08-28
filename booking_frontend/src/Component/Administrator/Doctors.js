import React, { useEffect, useState } from "react";
import "./Doctors.css";
import "./NotifyDialog.css";
import { postData } from "../FetchNodeServices";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import DialogContentText from '@mui/material/DialogContentText';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { isEmpty, errorMessage, successMessage } from "../Checks";



const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [editOpen, setEditOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [doctorId, setDoctorId] = React.useState("");
    const [doctorName, setDoctorName] = React.useState("");
    const [doctorType, setDoctorType] = React.useState("");
    const [startTime, setStartTime] = React.useState("");
    const [endTime, setEndTime] = React.useState("");
    const [shift, setShift] = React.useState("");
    const [duration, setDuration] = React.useState(dayjs(''));
    const emailId = sessionStorage.getItem('email');
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [cnfDelete, setCnfDelete] = useState("");
   


    
    const fetchAllDoctors = async () => {
        var body = { emailId: emailId };
        var list = await postData('doctor/fetchdoctorbyemail', body);
        setDoctors(list.data);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            doctorName: data.get('doctorName'),
            doctorType: data.get('doctorType'),

        });

    }

    const handleEdit = async (doctorId) => {
        setEditOpen(true);
        setDoctorId(doctorId);
        var body = { doctorId: doctorId }
        var list = await postData('doctor/fetchdoctorbyid', body);
        setDoctorName(list.data[0].doctorName)
        setDoctorType(list.data[0].doctorType)
        setStartTime(list.data[0].startTime)
        setEndTime(list.data[0].endTime)
        setShift(list.data[0].shift)
        setDuration(list.data[0].duration)
    }

    const handleDelete = async (doctorId) => {
        setDeleteOpen(true);
        setDoctorId(doctorId);
        setCnfDelete(doctorId);
    }

    const handleButton = async () => {
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
        if (!err) {
            var body = { doctorId: doctorId, doctorName: doctorName, doctorType: doctorType, startTime: startTime, endTime: endTime, shift: shift, duration: duration, emailId: emailId };
            var res = await postData('doctor/editdoctor', body);
            if (res) {
                setEditOpen(false);
                successMessage('Record updated successfully!');
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

    const handleClose = () => {
        setEditOpen(false);
        setIsFormDirty(false)
    };

    const handleClose1 = () => {
        setDeleteOpen(false)
    }



    useEffect(() => {
        fetchAllDoctors();
        if (duration.$d === undefined) {

            setDuration(duration);
        }
        else {
            const string = duration.$d;
            const dur = string.toString().slice(16, 21);
            setDuration(dur);
        }

        
        


    }, [doctorName, doctorType, startTime, endTime, shift, duration, doctors])


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
                            Are you sure you want to delete this item?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
                        <Button onClick={async () => {
                            await postData('doctor/deletedoctor', { doctorId: cnfDelete });
                            errorMessage('Record Deleted Sccessfully!')
                            setDeleteOpen(false);
                        }} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    const storeDialog = () => {
        return (
            <div>

                <Dialog

                    fullWidth={true}
                    open={editOpen}
                    onClose={handleClose}
                >
                    <DialogContent>

                        <Box
                            noValidate
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                m: 'auto',
                                width: 'fit-content',

                            }}
                        //onSubmit={handleSubmit1} 
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', flexDirection: 'column', margin: 'auto' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <DialogTitle><span style={{ fontFamily: 'sans-serif', color: '#6d6b6a', display: 'flex', justifyContent: 'center', padding: '0px' }}>Edit Doctors</span></DialogTitle>
                            <FormControl sx={{ mt: 0, minWidth: 120 }}>
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
                                            value={doctorName}
                                            onChange={(e) => (setDoctorName(e.target.value) || setIsFormDirty(true))}

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
                                            value={doctorType}
                                            onChange={(e) => (setDoctorType(e.target.value) || setIsFormDirty(true))}

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
                                            onChange={(e) => (setStartTime(e.target.value) || setIsFormDirty(true))}
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
                                            onChange={(e) => (setEndTime(e.target.value) || setIsFormDirty(true))}

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
                                            value={shift}
                                            onChange={(e) => (setShift(e.target.value) || setIsFormDirty(true))}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{ marginTop: '-8px' }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <DemoContainer components={['TimePicker']} >
                                                <TimeField
                                                    label="Duration"
                                                    defaultValue={dayjs('2022-04-17T' + `${duration}`)}
                                                    format="HH:mm"
                                                    fullWidth
                                                    //value={dayjs('2022-04-17T' + `${duration}`)}
                                                    onChange={(e) => (setDuration(e) || setIsFormDirty(true))}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>


                                <Button
                                    //type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    style={{ marginTop: 12 }}
                                    sx={{ mt: 2, mb: 1, backgroundColor:'#990ac8',color:'white'}}
                                    onClick={() => handleButton()}
                                    disabled={!isFormDirty}
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


    return (
        <>
            {doctors.length > 0 && (doctors.map((item) => (
                <div className="card" key={item.doctorId}>
                    <div className="hotel-info">
                        <h1 style={{ fontSize: '18px', fontFamily: 'aerial' }}>Doctor Name: {item.doctorName}</h1>
                        <div style={{ fontSize: '16px', fontFamily: 'aerial', color:'grey'}}>Specialization: {item.doctorType}</div>
                        <div style={{ fontSize: '14px', fontFamily: 'aerial', color:'grey', marginTop:'-5px'}}>Start Time: {item.startTime.slice(0, 5)}&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;End Time: {item.endTime.slice(0, 5)}</div>

                    </div>
                    <div className="buttons" style={{ marginTop: '-30px' }}>
                        <button
                            className="btn btn-success btn-lg"
                            type="active"
                           
                            onClick={() => handleEdit(item.doctorId)}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-success btn-lg"
                            type="active"
                            onClick={() => handleDelete(item.doctorId)}
                        
                        >
                            Delete
                        </button>
                    </div>
                </div>
                
            )))}
            {doctors.length === 0 && (
                <p>No Doctors Found</p>
            )}
            {storeDialog()}
            {DeleteDialog()}
            
        </>
    );
};

export default Doctors;
