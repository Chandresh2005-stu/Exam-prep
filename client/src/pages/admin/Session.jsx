import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Session = () => {

    // ✅ FIX 1: name → title
    const [form, setForm] = useState({
        title: '',
        description: ''
    });

    const [data, setData] = useState([]);

    const [editForm, setEditForm] = useState(false);
    const [id, setId] = useState('');

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
                // ✅ FIX 2: id direct use
                const res = await axios.put(
                    `${import.meta.env.VITE_API_URL}/api/session/${id}`,
                    form
                );
                if (res) {
                    alert('Session Updated Successfully');
                    setEditForm(false);
                    setForm({ title: '', description: '' });
                    handlefetch();
                }
            } else {
                const res = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/session`,
                    form
                );
                if (res) {
                    alert('Session Added Successfully');
                    setForm({ title: '', description: '' });
                    handlefetch();
                }
            }
        } catch (er) {
            console.error(er);
            alert("Sorry Try Again Later");
        }
    };

    const handlefetch = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/session`
            );
            // ✅ FIX 3: safe data handling
            setData(res.data.data || res.data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        handlefetch();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/session/${id}`
            );
            if (res) {
                alert("Deleted Successfully");
                handlefetch();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (item) => {
        // ✅ FIX 4: name → title
        setForm({
            title: item.title,
            description: item.description
        });
        setId(item._id);
        setEditForm(true);
    };

    // ✅ FIX 5: ACTUAL UI (you were missing this)
    return (
        <div>
            <h2>Session Management</h2>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                    value={form.title}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Enter Description"
                    value={form.description}
                    onChange={handleChange}
                />

                <button type="submit">
                    {editForm ? "Update" : "Add"} Session
                </button>
            </form>

            <hr />

            {/* DATA LIST */}
            {data.length > 0 ? (
                data.map((item) => (
                    <div key={item._id}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>

                        <button onClick={() => handleEdit(item)}>Edit</button>
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No Sessions Found</p>
            )}
        </div>
    );
};

export default Session;