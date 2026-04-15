import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Subject = () => {
  const [form, setForm] = useState({
    name: '',
    description: ''
  });

  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editForm) {
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/subject/${id.id}`, form);
        if (res) {
          alert('Subject Updated Successfully');
          handlefetch();
        }
      } else {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/subject`, form);
        if (res) {
          alert('Subject Added Successfully');
          handlefetch();
        }
      }
    } catch (er) {
      alert("Sorry Try Again Later");
    }
  };

  const handlefetch = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/subject`);
    setData(res.data.data);
  };

  useEffect(() => {
    handlefetch();
  }, []);

  const handleDelete = async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/subject/${id}`);
    if (res) {
      alert("Deleted Successfully");
    } else {
      alert("Try again later");
    }
    handlefetch();
  };

  const [editForm, setEditForm] = useState(null);
  const [id, setId] = useState({ id: '' });

  const handleEdit = async (item) => {
    setForm({
      name: item.name,
      description: item.description
    });
    setId({
      id: item._id
    });
    setEditForm(true);
  };

  return (
    <div>
      {/* UI same as before */}
    </div>
  )
}

export default Subject;