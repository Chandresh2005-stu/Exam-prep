import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Examinee = () => {
  const [data, setData] = useState([]);

  const handlefetch = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/examinee`);
    setData(res.data.data);
  };

  useEffect(() => {
    handlefetch();
  }, []);

  // handle delete logic
  const handleDelete = async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/examinee/${id}`);
    if (res) {
      alert("Deleted Successfully");
    } else {
      alert("Try again later");
    }
    handlefetch();
  };

  // handle edit
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      email: item.email,
      college: item.college,
      qualification: item.qualification,
      address: item.address,
      number: item.number,
    });
    setId(item._id);
    setEditForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/examinee/${id}`, form);
      alert("Updated Successfully");
      setEditForm(false);
      setForm({
        name: "",
        email: "",
        college: "",
        qualification: "",
        address: "",
        number: "",
      });
      handlefetch();
    } catch (err) {
      console.error("Update failed", err);
      alert("Update Failed");
    }
  };

  return (
    <div
      className="card border-primary mx-auto mt-2"
      style={{ width: "95%", maxWidth: "1300px", borderRadius: "12px" }}
    >
      <div className="card-body">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="fw-bold text-Dark">Details</h3>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-12">
            <table className="table table-bordered table-hover text-center">
              <thead style={{ backgroundColor: "#e0ecff" }}>
                <tr>
                  <th>S.No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>College</th>
                  <th>Qualification</th>
                  <th>Address</th>
                  <th>Number</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, i) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.college}</td>
                    <td>{item.qualification}</td>
                    <td>{item.address}</td>
                    <td>{item.number}</td>
                    <td>
                      <button className='btn btn-success' onClick={() => handleEdit(item)}>Edit</button>
                      <button className='btn btn-danger mx-2' onClick={() => handleDelete(item._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examinee;