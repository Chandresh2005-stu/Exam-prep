import React, { useEffect, useState } from "react";
import axios from 'axios';

const Registration = () => {
  const [formData,setFormData]=useState({
    name:'',
    email:'',
    number:'',
    address:'',
    password:'',
    college:'',
    qualification:'',
    session:'',
  });
  const[sessions,setSessions]=useState([]);
  const handlefetch=async()=>{
    try{
      const res= await axios.get(`${import.meta.env.VITE_API_URL}/api/session`);
      setSessions(res.data.data);
      //console.log();
    }
    catch(er){
      console.log(er);
    }
  }
  useEffect(()=>{
    handlefetch();
  },[])
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res= await axios.post(`${import.meta.env.VITE_API_URL}/api/examinee`,formData);
      alert('Examinee Registered!');
      setFormData({
        name:'',
        email:'',
        number:'',
        address:'',
        password:'',
        college:'',
        qualification:'',
        session:'',
      });
    } catch(error){
      console.error('Submission error:',error);
      alert("Failed to Register");
    }
  }
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #A6B1E1 , #A6B1E1 )",
      }}
    >
      <div className="container">
        <div className="row my-5">
          <div className="col-lg-9 mx-auto">
            <div
              className="card border-0 shadow-lg p-4"
              style={{ borderRadius: "20px" }}
            >
              <div className="mb-3 text-center">
                <h3 className="text-DARK fw-bold">Sign Up Here</h3>
                <h6 className="text-secondary">Please fill this form.</h6>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                  <div className="col-md-12">
                    <input
                      type="text" name="name" value={formData.name} onChange={handleChange} required
                      className="form-control bg-light"
                      placeholder="First Name"
                    />
                  </div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-12">
                    <input
                      type="email" name="email" value={formData.email} onChange={handleChange} required
                      className="form-control bg-light"
                      placeholder="Enter Email"
                    />
                  </div>
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <input
                      type="tel" name="number" value={formData.number} onChange={handleChange} required
                      className="form-control bg-light"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="col-md-6">
                    <select
                      name="session"
                      className="form-control bg-light form-select"
                      value={formData.session}
                      onChange={handleChange}
                      required
                      placeholder="Session"
                    >
                      <option value="">Select session</option>
                      {sessions.map((item)=>(
                        <option value={item._id} key={item._id}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-12">
                    <input
                      type="password" name="password" value={formData.password} onChange={handleChange} required
                      className="form-control bg-light"
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <textarea name="address" value={formData.address} onChange={handleChange} required
                    className="form-control bg-light"
                    placeholder="Address"
                    rows="3"
                  ></textarea>
                </div>

                <div className="mb-3">
                  <input
                    type="text" name="college" value={formData.college} onChange={handleChange} required
                    className="form-control bg-light"
                    placeholder="College Name"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text" name="qualification" value={formData.qualification} onChange={handleChange} required
                    className="form-control bg-light"
                    placeholder="Qualification"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary px-4 py-2 rounded-pill"
                  >
                    Register Here
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;