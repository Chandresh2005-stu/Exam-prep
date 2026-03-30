import React, { useState } from 'react';
import { Link, Outlet } from 'react-router';

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const role = localStorage.getItem('role')
  if (role == "admin") {
    var email = localStorage.getItem('email')
  }
  else {
    window.location.href = '/adlogin'
  }
  const getGreeting = () => {
    const hour = new
      Date().getHours();
    if (hour < 12) {
      return ("Good Morning Admin")
    }
    else if (hour < 18) {
      return ("Good Afternoon Admin")
    }
    else {
      return (" Good Evening Admin")
    }
  }
  return (
    <div className={`dashboard-container ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar">
        <div className="sidebar-header">
          <h4><i className="fa-solid fa-book"></i> ExamPrep</h4>
        </div>
        <ul className="nav-links">
          <li><i class="fa-solid fa-chart-bar"></i> <Link to="/admin/session" className='text-white no-underline'>Session</Link>
          </li>
          <li> <i class="fa-solid fa-book-open"></i> <Link to="/admin/subject" className='text-white no-underline'>Subject</Link></li>
          <li> <i className="fa-solid fa-user"></i><Link to="/admin/examine" className='text-white no-underline'> Examinee</Link></li>
          <li><i className="fa-solid fa-question"></i><Link to="/admin/ques" className='text-white no-underline'> Question Bank</Link></li>
          <li><i class="fa-solid fa-pen"></i><Link to="/admin/examination" className='text-white no-underline'> Examination</Link></li>
          <li> <Link to="/admin/report" className='text-white no-underline'> Report Generation</Link></li>
          <li> <i class="fa-solid fa-trophy" ></i><Link to="/admin/results" className='text-white no-underline'> Result Declaration</Link></li>
        
          <li> <i class="fa-solid fa-calculator"></i> <Link to="/admin/contactus" className='text-white no-underline'>Contact Us</Link></li>

          <li><i class="fa-solid fa-arrow-right-from-bracket"></i> <Link className='text-white no-underline' onClick={() => {
            localStorage.removeItem('role')
            localStorage.removeItem('email')
            window.location.href = '/adlogin'
          }}> Log out</Link></li>
          <li>  <Link to="/admin/password"  className='text-white no-underline'>Change Password</Link></li>
        </ul>
      </div>

      <div className="main">
        <div className="topbar">

          <span ><h2>{getGreeting()}</h2></span>

          <h2>Admin Dashboard</h2>
        </div>

        <div className="content">
          <Outlet />

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
