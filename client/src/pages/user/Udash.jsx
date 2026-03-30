import React, { useState } from 'react';
import { Link, Outlet } from 'react-router';

const Udash = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const getGreeting = () => {
    const hour = new
      Date().getHours();
    if (hour < 12) {
      return ("Good Morning Examinee")
    }
    else if (hour < 18) {
      return ("Good Afternoon Examinee")
    }
    else {
      return (" Good Evening Examinee")
    }
  }
  const role = localStorage.getItem('userRole')
  if (role == "user") {
    var email = localStorage.getItem('userEmail')
  }
  else {
    window.location.href = '/'
  }
  return (

    <div className={`dashboard-container ${collapsed ? 'collapsed' : ''}`}>

        <div className="sidebar">
        <div className="sidebar-header">
          <h4>Welcome</h4>
        </div>
        <ul className="nav-links">
          <li><i className="fa-solid fa-chart-bar"></i> <Link to="/udash/profile" className='text-white no-underline'>Profile</Link>
          </li>
          <li> <i className="fa-solid fa-book-open"></i> <Link to="/udash/myexam" className='text-white no-underline'>My Exam</Link></li>
         
          <li><i className="fa-solid fa-trophy"></i><Link to="/udash/res" className='text-white no-underline'> Result</Link></li>
          <li> <i className="fa-solid fa-calculator"></i> <Link to="/udash/chanpass" className='text-white no-underline'>Change Password</Link></li>

          <li><i className="fa-solid fa-arrow-right-from-bracket"></i> <Link className='text-white no-underline' onClick={() => {
            localStorage.removeItem('role')
            localStorage.removeItem('email')
            window.location.href = '/'
          }}> Log out</Link></li>
          <li> <i className="fa-solid fa-calculator"></i><Link to="/udash/contact" className='text-white no-underline'> Contact Us</Link></li>

        </ul>
      </div>
      
        <div className="main">
        <div className="topbar">

          <span style={{ fontSize: "1.8rem", color: "white", fontWeight: "bold" }}>{getGreeting()}</span>
          <h2>Examinee</h2>
        </div>

        <div className="content">
          <Outlet />

        </div>


      </div>
     



    </div>
  );
};

export default Udash;
