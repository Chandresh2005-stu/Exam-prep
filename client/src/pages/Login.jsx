import React from 'react'
import { useState } from 'react'
import axios from 'axios'
const Login = () => {
    const [data, formData] = useState({
        email:'',
        password:''
    })
    const handleChange = (e)=>{
        console.log(e.target.value)
    
        const{name , value} = e.target
        formData((prev) => ({ ...prev, [name]: value }));
        console.log(data);
        
    }
     const handleSubmit = async(e) =>{
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/examinee/login', data)
        //console.log(res.data.data);
        if(res.data.message=="Login Successfully"){
            localStorage.setItem("userRole",res.data.user.role)
            localStorage.setItem("userEmail",res.data.user.email)
            localStorage.setItem("userId",res.data.user.id)
            window.location.href='/udash/'
        }
        
    }

    return (
        <div style={{
            background: "#0f0e47",
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignitems: 'center',
        }}>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-sm-6  pt-5"><div className="card " style={{ height: "400px", width: "400px" }}>
                        <form onSubmit={handleSubmit}>
                            <h3 className="mx-3 pt-2"> User Login</h3>
                            <p className='mx-3'>Don't have an account?
                                <a href="/registration"><u> Sign Up</u></a>
                            </p>
                            <div className="mb-3 mx-3 mt-5">

                                <input type="email" onChange={handleChange} className="form-control" id="exampleInputEmail1" placeholder="Username" name='email' 
                                    aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3 mx-3 mt-3">
                                <input type="password" name='password' onChange={handleChange} className="form-control" id="exampleInputPassword1"
                                    placeholder="password" />
                            </div>
                            <div className="mb-2 mx-3 mt-3 text-center"><button style={{backgroundColor:"#0f0e47"}} type="submit" className=" form-control text-white btn ">Log in now</button>
                            </div>
                            <div className='mx-2 text-end'>
                                <a href="" ><u>Forgot password</u></a>
                            </div>
                        </form>
                        <br />
                        
                       <div className='mx-3'>
                         <p>Or connect us with
                            <br />
                           <button className='mx-1' style={{borderRadius:'50%'}}><i className="fa-brands fa-google"></i></button>
                             <button className='mx-1' style={{borderRadius:'50%'}}><i className="fa-brands fa-facebook"></i></button>
                           <button className='mx-1' style={{borderRadius:'50%'}}> <i className="fa-brands fa-apple"></i></button></p>
                       </div>
                        
                    </div>

                    </div>
                    <div className="col-sm-6 pt-5">
                        <h2 className='text-white'>Examprep <i className="fa-solid fa-book"></i></h2><br /><br />
                        <h5 className='text-white'>A digital platform that enbles students to give online exams, record progress with ease and efficiency. </h5><br />
                        <p className='text-white'>Enroll now and be the part of us. <br />
                         Happy Learning!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login