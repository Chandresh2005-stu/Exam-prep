import React, { useState } from 'react'
import axios from 'axios';

const AdminLogin = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/login`, form);

        if (res.data.message == "Login Successfully") {
            localStorage.setItem("role", res.data.admin.role)
            localStorage.setItem("email", res.data.admin.email)
            window.location.href = '/admin'
        } else {
            window.alert("your email or password are incorrect")
        }
    }

    return (
        <div style={{
            background: "#0f0e47",
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', // ✅ FIXED (alignitems → alignItems)
        }}>

            <div className="container">
                <div className="row mt-5">
                    <div className="col-sm-6 pt-5">
                        <div className="card" style={{ height: "400px", width: "400px" }}>
                            <form onSubmit={handleSubmit}>
                                <h3 className="mx-3 pt-2"> Admin Login</h3>
                                <p className='mx-3'>Don't have an account?
                                    <a href=""><u> Sign Up</u></a>
                                </p>

                                <div className="mb-3 mx-3 mt-5">
                                    <input
                                        type="email"
                                        name='email'
                                        className="form-control"
                                        placeholder="Email"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3 mx-3 mt-3">
                                    <input
                                        type="password"
                                        name='password'
                                        className="form-control"
                                        placeholder="password"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-2 mx-3 mt-3 text-center">
                                    <button type="submit" style={{ background: "#0f0e47" }} className="form-control btn text-white">
                                        Log in now
                                    </button>
                                </div>

                                <div className='mx-2 text-end'>
                                    <a href=""><u>Forgot password</u></a>
                                </div>
                            </form>

                            <br />

                            <div className='mx-3'>
                                <p>Or connect us with
                                    <br />
                                    <button className='mx-1' style={{ borderRadius: '50%' }}>
                                        <i className="fa-brands fa-google"></i>
                                    </button>
                                    <button className='mx-1' style={{ borderRadius: '50%' }}>
                                        <i className="fa-brands fa-facebook"></i>
                                    </button>
                                    <button className='mx-1' style={{ borderRadius: '50%' }}>
                                        <i className="fa-brands fa-apple"></i>
                                    </button>
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="col-sm-6 pt-5">
                        <h2 className='text-white'>Examprep <i className="fa-solid fa-book"></i></h2>
                        <br /><br />
                        <h5 className='text-white'>Welcome Back Admin! </h5>
                        <br />
                        <p className='text-white'>Happy Learning!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin