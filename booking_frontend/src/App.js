import React, { lazy, Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const AdminRegistration = lazy(() => import('./Component/Administrator/AdminRegistration'));
const ForgetPassword = lazy(() => import('./Component/Administrator/ForgetPassword'));
const AdminLogin = lazy(() => import('./Component/Administrator/AdminLogin'));
const AdminHome = lazy(() => import('./Component/Administrator/AdminHome'));
const Profile = lazy(() => import('./Component/Administrator/Profile'));
const Doctors = lazy(() => import('./Component/Administrator/Doctors'));
const UserRegistration = lazy(() => import('./Component/UserInterface/UserRegistration'));
const UserLogin = lazy(() => import('./Component/UserInterface/UserLogin'));
const UserForget = lazy(() => import('./Component/UserInterface/UserForget'));
const UserHome = lazy(() => import('./Component/UserInterface/UserHome'));
const DoctorData = lazy(() => import('./Component/UserInterface/DoctorData'));
const UserProfile = lazy(() => import('./Component/UserInterface/UserProfile'));
const DoctorView = lazy(() => import('./Component/UserInterface/DoctorView'));
const DrawerData = lazy(() => import('./Component/UserInterface/DrawerData'));
const Home = lazy(() => import('./Component/UserInterface/Home'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/adminregister' element={<AdminRegistration/>}/>
          <Route path='/forget' element={<ForgetPassword/>}/>
          <Route path='/adminlogin' element={<AdminLogin/>}/>
          <Route path='/adminhome' element={<AdminHome/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/doctors' element={<Doctors/>}/>
          <Route path='/userregister' element={<UserRegistration/>}/>
          <Route path='/userlogin' element={<UserLogin/>}/>
          <Route path='/userforget' element={<UserForget/>}/>
          <Route path='/userhome' element={<UserHome/>}/>
          <Route path='/doctordata' element={<DoctorData/>}/>
          <Route path='/userprofile' element={<UserProfile/>}/>
          <Route path='/doctorview' element={<DoctorView/>}/>
          <Route path='/drawer' element={<DrawerData/>}/>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;