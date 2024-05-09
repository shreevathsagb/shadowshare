import Registration from './Components/Registration';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useEffect, useState } from 'react';
import Login from "./Components/Login";
import Home from "./Components/Home";
import Main from "./Components/Main";
import Addpost from './Components/Addpost';
import Profile from './Components/Profile';
import Editprofile from './Components/Editprofile';
import Viewusers from './AdminComponents/Viewusers';
import Viewposts from './AdminComponents/Viewposts';
import Alogin from './AdminComponents/Alogin';
import Amain from './AdminComponents/Amain';
import Adminpassword from './AdminComponents/Adminpassword.js';
import { Usercontext } from './Usercontext.js';
import { Admincontext } from './Admincontext.js';
export default function App() {
  const [isPopupOpen,setPopupOpen] = useState(false);
  const [notify, setnotify] = useState(false);
  const [edit_profile,setedit_profile] = useState(false);
  const [user,setuser]=useState(()=>{
    try{
      const item =window.localStorage.getItem('user');
      return item ? JSON.parse(item) :{}
    }catch(error){
      console.log(error);
      return {}
    }
  });
  useEffect(()=>{
    localStorage.setItem('user',JSON.stringify(user))
  },[user]);

  const [admin,setadmin]=useState(()=>{
    try{
      const item =window.localStorage.getItem('admin');
      return item ? JSON.parse(item) :{}
    }catch(error){
      console.log(error);
      return {}
    }
  });
  useEffect(()=>{
    localStorage.setItem('admin',JSON.stringify(admin))
  },[admin]);
  return (<>
  <Admincontext.Provider value={{admin,setadmin}}>
  <Usercontext.Provider value={{user,setuser}}>
    <BrowserRouter>
      <Routes>
        <Route path='alogin' element={<Alogin/>}/>
        <Route path='amain' element={<Amain/>}>
        <Route index element={<Viewusers/>}/>
        <Route path='Viewposts' element={<Viewposts/>}/>
        <Route path='adminpassword' element={<Adminpassword/>}/>
        
     
        
        
        </Route>
        <Route path='/' element={<Login/>} />
        <Route path='registration' element={<Registration />} />
        <Route path='Main' element={<Main notify={notify}  setnotify={setnotify} isPopupOpen={isPopupOpen} setPopupOpen={setPopupOpen}/>}>
          <Route index element={<Home isPopupOpen={isPopupOpen} setPopupOpen={setPopupOpen} notify={notify}/>}/>
          <Route path='profile' element={<Profile isPopupOpen={isPopupOpen} setPopupOpen={setPopupOpen} edit_profile={edit_profile} setedit_profile={setedit_profile} notify={notify}/>}/>
          <Route path='editprofile' element={<Editprofile edit_profile={edit_profile} setedit_profile={setedit_profile} user={user}/>}/>
          <Route path='addpost' element={<Addpost />}/>
        </Route>
      </Routes>
    </BrowserRouter></Usercontext.Provider></Admincontext.Provider></>
  );
}

