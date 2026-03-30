import React, {useState} from 'react'
import axios from 'axios';
const Password = () => {
    const email = localStorage.getItem('email');
    const [data, formData] = useState({
        op:'',
        np:'',
        cnp:'',
    })
    const handleChange = (e) => {
        const {name , value} = e.target
        formData((prev) =>(
            {...prev,[name]:value}
        ))        
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const res = await axios.put(`http://localhost:5000/api/admin/change/${email}`,data)
        console.log(res)
       try{
         if(res){

            alert("Password CHanged Successfully")
            if(res.data.message ==="Password Changed Successfully"){
                localStorage.removeItem('email')
                
                localStorage.removeItem('role')
                window.location.href = '/adlogin'
            }
        }
    }
    catch(er){
        alert("Sorry Try Again Later")
    }
       }

  return (
    <div>
        <div className="row  ">
                <div className="col-sm-12 ">
                    <div className="card border-success" style={{ height: "300px", width: "100%" }}>
                        <div className="">
                            <form onSubmit={handleSubmit} method="post" className="border p-2 rounded">
                                <div className="row ">
                                    <div className="col-sm-12 ">
                                        <h5 className="text-primary"><i className="fa-solid fa-plus"></i>Update Password</h5>
                                    </div>
                                </div>
                                <div className="row mt-1">
                                    <div className="col-sm-12"><h6>Old Password</h6></div>
                                    <div className="col-sm-12 ">
                                        <input type="password" name='op'placeholder="" className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-1">
                                    <div className="col-sm-12"><h6>New Password</h6></div>
                                    <div className="col-sm-12 ">
                                        <input name="np" type='password' className="form-control" onChange={handleChange} placeholder="" rows="2"/>
                                    </div>
                                </div>
                                <div className="row mt-1">
                                    <div className="col">
                                        <label><h6>New Password</h6></label>
                                        <input type="password" name="cnp" onChange={handleChange} className="form-control" placeholder="" aria-label="First name"  />
                                    </div>
                                </div>

                                <button type="submit"   className="btn btn-primary  mt-1" style={{ background: "#062326e2 " }}>Update Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Password