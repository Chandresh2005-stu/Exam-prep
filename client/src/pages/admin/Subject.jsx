import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
const Subject = () => {
     const [form, setForm] = useState({
            name:'',
            description:''
     })
      //fetch data hook
    const [data , setData] = useState([]);
    //handlechange function
    const handleChange = (e)=>{
        // console.log(e.target.value);
        const{name , value} = e.target;
        setForm((prev)=>(
            {...prev,[name]:value}
        ));
        //console.log(form)
        

    }
      //handlesubmit
      const handleSubmit = async (e)=>{
        e.preventDefault();
       try {
           if (editForm) {
             const res = await axios.put(`http://localhost:5000/api/subject/${id.id}`, form)
            if (res) {
                alert('Session Added Successfully')
                  handlefetch();
            }
           }
           else{
             const res = await axios.post('http://localhost:5000/api/subject', form)
            if (res) {
                alert('subject Added Successfully')
                  handlefetch();
            }
           }
        }
        catch (er) {
            alert("Sorry Try Again Later")
        }
    }
     
      //fetch data api
      const handlefetch = async()=>{
        const res = await axios.get('http://localhost:5000/api/subject')
        //console.log(res.data);
        setData(res.data.data);
        // console.log(res.data.data);
        
      };
      useEffect(()=>{
        handlefetch();
      },[])
        //handle delete logic
    const handleDelete =async  (id) => {
        console.log(id);
      const res = await axios.delete(`http://localhost:5000/api/subject/${id}`);
    if(res){
        alert("Deleted Successfully")
    }
    else{
        alert("Try again later");
    }
    handlefetch();
    }
    // handle edit
        const [editForm , setEditForm] = useState(null);
        const [id, setId] = useState({
            id:'',
        })
        const handleEdit = async(item)=>{
            setForm({
                name:item.name,
                description:item.description
            })
            setId({
                id:item._id
            })
            setEditForm(true); //
            console.log(form);
            
        }
      
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 mx-auto  pt-2 ">
                        <div className="card mx-auto mt-2" style={{ height: "320px", width: "100%" }}>
                            <div className="card-body">
                                <form  onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-sm-12" >Enter Subject Name:</div>
                                        <div className="col-sm-12 mt-2"><input type="text" placeholder='name' name = 'name' onChange={handleChange} className='form-control' value={form.name} /></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            Description
                                        </div>
                                        <div className="col-sm-12 mt-2">
                                            <textarea className='form-control' placeholder='text area' name = 'description'  value={form.description} onChange={handleChange} rows="5"></textarea></div>
                                    </div>
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-sm-6">
                                    <button  style={{backgroundColor:"#0f0e47"}}  className=' mt-3 form-control text-light'>Add</button>

                                    </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>



                </div>
            </div>
            <div className="container pt-4">
                  <div className="card mx-auto mt-2" style={{ height: "320px", width: "100%" }}>
                            <div className='card-body'>
                                <div className="row">
                                    <div className="col-sm-12"><h6><u>Subject List</u></h6></div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <table className='table table-border'>
                                            <thead className='table-primary'>
                                                <tr>
                                                    <th>S No</th>
                                                    <th>Session name</th>
                                                    <th>Description</th>
                                                    
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                 {data.map((item , i)=>(

                                                <tr key={item._id}>
                                                    <td>{i+1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.description}</td>
                                                    
                                                    <td><button  className='btn btn-danger' onClick={() => {
                                                    handleDelete(item._id)
                                                }}>Delete</button>
                                                 <button className='btn btn-success mx-2' onClick={()=>{
                                                    handleEdit(item)
                                                }}>Edit</button></td>
                                                
                                                </tr>
                                                 ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
        </div>
    )
}

export default Subject