import React,{useState, useEffect, useContext} from "react";
import UserContext from './context/userContext'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Apply from "./apply";
import Login from './login';
import Dashboard from './dashboard'
import NavBar from "./components/Navbar";
import Links from './edit/links'
import Profile from './edit/profile'
import Handle from './[handle]'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

function App() {

  const [userData, setUserData] = useState({
    name : '',
    role : '',
    bio : '',
    avatar : '',
    handle : ''
  })

  return (
    <div className="App">
    <UserContext.Provider value={{userData, setUserData}}>
 
      <Routes>
        <Route path="/" element={<Login />}/>
          {/* <Route index element={<Home />} /> */}
          <Route path="apply" element={<Apply />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="edit/links" element={<Links />} />
          <Route path="edit/profile" element={<Profile />} />
          <Route path={window.location?.pathname} element={<Handle />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        
      </Routes>
    </UserContext.Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
