import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, } from 'react-router'
import Registraion from './pages/Registraion'
import Login from './pages/Login'
import Dashboard from './pages/admin/Dashboard'
import Session from './pages/admin/Session'
import Subject from './pages/admin/Subject'
import Examine from './pages/admin/Examine'
import AdminLogin from './pages/admin/AdminLogin'
import Udash from './pages/user/Udash'
import Questionbank from './pages/admin/Questionbank'
import Examination from './pages/admin/Examination'
import Report from './pages/admin/Report'
import MyExam from './pages/user/MyExam'
import ContactUs from './pages/admin/ContactUs'
import Profile from './pages/user/Profile'
import GetExam from './pages/user/GetExam'
import Password from './pages/admin/Password'
import ChanPass from './pages/user/ChanPass'
import Contact from './pages/user/Contact'
import ExamResultsDeclaration from './pages/admin/ExamResultsDeclaration'
import Result from './pages/user/Result'
import Adhome from './pages/admin/Adhome'





function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          {/*registyration route*/}

          <Route path='/' element={<Login />}></Route>
          <Route path='/registration' element={<Registraion />}></Route>
          <Route path='/adlogin' element={<AdminLogin />}></Route>
          <Route path='/udash/' element={<Udash />}>
          <Route index element={<Profile/>}></Route>
            <Route path='myexam' element={<MyExam />}></Route>
            <Route path='profile' element={<Profile />}></Route>
            <Route path='getexam/:id' element={<GetExam />}></Route>
            <Route path='chanpass' element={<ChanPass />}></Route>
            <Route path='contact' element={<Contact />}></Route>
            <Route path='res' element={<Result />}></Route>

          </Route>
          <Route path='/admin/' element={<Dashboard />}>
          <Route index element={<Adhome/>}></Route>
            <Route path='session' element={<Session />}></Route>
            <Route path='subject' element={<Subject />}></Route>
            <Route path='examine' element={<Examine />}></Route>
            <Route path='ques' element={<Questionbank />}></Route>
            <Route path='examination' element={<Examination />}></Route>
            <Route path='report' element={<Report />}></Route>
            <Route path='results' element={<ExamResultsDeclaration />}></Route>
            <Route path='contactus' element={<ContactUs />}></Route>
            <Route path='password' element={<Password />}></Route>

          </Route>




        </Routes>
      </Router>
    </>
  )
}

export default App
