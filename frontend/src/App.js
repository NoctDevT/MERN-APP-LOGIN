import react, { useState, useRef, useEffect, useLayoutEffect } from 'react'

import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom'
// import useDarkMode from './hooks/useDarkMode';

import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import UserPage from './pages/UserPage'
import Sidebar from './hooks/Sidebar'
import Messages from './pages/Messages'

function App() {



  return (
    <>
      <Router>
        <div className="flex">
        <Sidebar />
        <div className="flex-1">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Users" element={<UserPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/Messages" element={<Messages />} />

        </Routes>
        </div>
        </div>

      </Router>
    </>
  );
}
export default App;
