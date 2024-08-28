import React, { useEffect, useState } from "react";
import { postData } from "../FetchNodeServices";
import { useNavigate } from "react-router-dom";

export default function DoctorData({searchTerm}) {
    const hexcode = sessionStorage.getItem('hexcode');
    const [emailId, setEmailId] = useState("");
    const [doctors, setDoctors] = useState([]);
    const history = useNavigate();

    const fetchEmailByHex = async() => {
        var res = await postData('admin/fetchemailbyhexcode', {hexcode:hexcode});
        setEmailId(res.data[0].emailId);
    }

    const fetchAllDoctorsByEmail = async() => {
        var res = await postData('doctor/fetchdoctorbyemail', {emailId:emailId});
        setDoctors(res.data);

    }

    const handleView = (doctorId) => {
        history({pathname:'/doctorview'},{state:doctorId})
    }

    useEffect(()=>{
        fetchEmailByHex();
        if(emailId){
            fetchAllDoctorsByEmail();
        }
        
    },[emailId,searchTerm])

    const filteredDoctors = searchTerm === ""
    ? doctors
    : doctors.filter((doctor) => {
        return doctor.doctorName.toLowerCase().includes(searchTerm);
      });

    return (<div>
        <div>
            <h1 style={{ fontFamily: "Times New Roman", fontSize: '18px',marginTop:'14px',marginLeft:'21px'}}>Find Your Doctor </h1>
            {/* <span style={{display:'flex',justifyContent:'center',marginTop:'-28px',color:'grey',fontSize:'14px'}}>Rathi Hospital</span> */}
            <span style={{display:'flex',justifyContent:'flex-end',marginTop:'-28px',marginRight:'21px',color:'blue'}}>See all</span>
        </div>
        {filteredDoctors.length > 0 && (filteredDoctors.map((item) => (
        <div className="card" key={item.doctorId} onClick={()=>handleView(item.doctorId)} style={{padding:'12px'}}>
            <div className="hotel-info">
                <h1 style={{ fontSize: '18px', fontFamily: 'aerial', fontWeight:'525'}}>Doctor Name: {item.doctorName}</h1>
                <div style={{ fontSize: '16px', fontFamily: 'aerial', color: 'grey' }}>Specialization: {item.doctorType}</div>
                <div style={{ fontSize: '14px', fontFamily: 'aerial', color: 'grey', marginTop: '-5px' }}>Start Time: {item.startTime.slice(0, 5)}&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;End Time: {item.endTime.slice(0, 5)}</div>

            </div>
        </div>)))}

    </div>)

}