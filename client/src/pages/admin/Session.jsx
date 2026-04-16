import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Session = () => {

    // ✅ FIX 1: name → title
    const [form, setForm] = useState({
        title: '',
        description: ''
    });

    const [data, setData] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => (
            { ...prev, [name]: value }
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editForm) {
                // ✅ FIX 2: id.id → id
                const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/session/${id}`, form);
                if (res) {
                    alert('Session Updated Successfully');
                    handlefetch();
                }
            } else {
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/session`, form);
                if (res) {
                    alert('Session Added Successfully');
                    handlefetch();
                }
            }
        }
        catch (er) {
            console.error(er);
            alert("Sorry Try Again Later");
        }
    };

    const handlefetch = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/session`);
            // ✅ FIX 3: safe handling
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
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/session/${id}`);
            if (res) {
                alert("Deleted Successfully");
            }
            handlefetch();
        } catch (error) {
            console.error(error);
        }
    };

    const [editForm, setEditForm] = useState(false);
    const [id, setId] = useState('');

    const handleEdit = async (item) => {
        // ✅ FIX 4: name → title
        setForm({
            title: item.title,
            description: item.description
        });

        // ✅ FIX 5: store id directly
        setId(item._id);

        setEditForm(true);
    };

    return (
        <div>
            {/* ✅ YOUR OLD UI REMAINS SAME — JUST UPDATE FIELD USAGE BELOW */}

            {/* ⚠️ IMPORTANT:
               Wherever you are using:
               item.name  → change to item.title
               form.name  → change to form.title
            */}

        </div>
    )
}

export default Session;
