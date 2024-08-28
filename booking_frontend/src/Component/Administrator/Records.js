import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { postData } from '../FetchNodeServices';

export default function Records(props) {

    const [isOpen, setIsOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const moment = require('moment-timezone');
    const [doctorNames, setDoctorNames] = React.useState({});

    const fetchData = async () => {
        var hexcode = sessionStorage.getItem('hexcode')
        var result = await postData('slots/fetchslotsbyhexcode', { hexcode: hexcode })
        setData(result.data)
       
    }

    const fetchDoctorName = async (doctorId) => {
        var res = await postData('doctor/fetchdoctornamebyid', { doctorId: doctorId })
        return res.data[0].doctorName
    }

    const handleClick = () => {
        props.onUpdate();
    }


    React.useEffect(() => {
        fetchData()
        handleClick()
        if (props.status) {
            setIsOpen(true)
        }
       
    }, [props.status])

    React.useEffect(() => {
        const fetchDoctorNames = async () => {
            const promises = data.map((item) => fetchDoctorName(item.doctorId));
            const results = await Promise.all(promises);
            const doctorNamesObj = {};
            results.forEach((name, index) => {
                doctorNamesObj[data[index].doctorId] = name;
            });
            setDoctorNames(doctorNamesObj);
        };
        fetchDoctorNames();
    }, [data]);

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
            <div style={{ marginLeft: '16px', marginTop: '12px' }}>
                <div style={{ fontSize: '19px' }} className="font-medium text-gray-900">&nbsp;Records</div>
                <div className="mt-8" >
                    <div style={{ display: 'flex' }}>
                        {data.length === 0 ? (
                            <div style={{display:'flex',justifyContent:'center',marginTop:'50%',marginLeft:'25%'}}>
                                <p>No records found.</p>
                            </div>
                        ) : (
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {data.map((item) => (
                                    <li key={item.slotId} className="py-4" style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: '0.3s', padding: '14px', backgroundColor: '#f7f7f7', margin: '5px' }}>
                                        <div><span style={{ fontFamily: 'sans-serif', fontWeight: '550', fontSize: '14px' }}>Patient Name: </span><span style={{ fontSize: '14px', fontFamily: 'sans-serif' }}>{`${item.firstName} ${item.lastName}`}</span></div>
                                        <div><span style={{ fontFamily: 'sans-serif', fontWeight: '550', fontSize: '14px' }}>Slot Timing: </span><span style={{ fontSize: '14px', fontFamily: 'sans-serif' }}>{moment(item.bookDate).tz('Asia/Kolkata').format('YYYY-MM-DD')}&nbsp;({item.timeSlot.slice(0, 5)})</span></div>
                                        <div><span style={{ fontFamily: 'sans-serif', fontWeight: '550', fontSize: '14px' }}>Mobile No: </span><span style={{ fontSize: '14px', fontFamily: 'sans-serif' }}>{item.mobileno}</span></div>
                                        <div><span style={{ fontFamily: 'sans-serif', fontWeight: '550', fontSize: '12px' }}>Appointment to: </span><span style={{ fontSize: '12px', fontFamily: 'sans-serif', fontWeight: 'bold' }}>Dr. {doctorNames[item.doctorId] ? doctorNames[item.doctorId] : 'Loading...'}</span></div>
                                    </li>))}
                            </ul>)}
                    </div>
                </div>
            </div>


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
        </div>
    )
}