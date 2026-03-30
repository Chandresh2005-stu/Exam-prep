import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
const Contact = () => {
    const [formData, setFormData] = useState({
        question: '',
        email: localStorage.getItem('userEmail') || ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/message', formData);
            alert(response.data.message);
            setFormData({ question: '', email: formData.email });
        } catch (error) {
            console.error('Error Sending Message:', error);
            alert('Failed to send message');
        }
    }
    const [message, setMessage] = useState([]);
    const fetchMessages = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost:5000/api/message/${userId}`);
            setMessage(response.data.message);
        } catch (error) {
            cnsole.error('error fetching messages:', error);
        }
    }
    useEffect(()=>{
        fetchMessages();
    },[])
    return (
        <div>
            <h4 className='mx-3'>Contact Us</h4>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card border-primary" style={{ width: "100%" }}>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <textarea name="question" onChange={handleChange} placeholder='Feedback For Us' className='form-control' id="" rows={3}></textarea>
                                    <button type='submit' style={{ backgroundColor: "#0f0e47" }} className='btn text-white mt-3'>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container pt-3">
                <div className="card border-primary">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Question</th>
                                        <th>Date</th>
                                        <th>Reply</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {message.map((message, index) => (
                                        <tr key={message._id}>
                                            <td>{index + 1}</td>
                                            <td>{message.question}</td>
                                            <td>{new Date(message.createdAt).toLocaleDateString()}</td>
                                            <td>{message.reply || 'No reply yet'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact