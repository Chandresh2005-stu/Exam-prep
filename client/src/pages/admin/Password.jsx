import React, { useState } from 'react'
import axios from 'axios';

const Password = () => {
    const email = localStorage.getItem('email');

    const [data, setData] = useState({
        op: '',
        np: '',
        cnp: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/admin/change/${email}`,
                data
            );

            if (res.data.message === "Password Changed Successfully") {
                alert("Password Changed Successfully");
                localStorage.removeItem('email');
                localStorage.removeItem('role');
                window.location.href = '/adlogin';
            } else {
                alert("Try again");
            }

        } catch (er) {
            console.error(er);
            alert("Sorry Try Again Later");
        }
    };

    return (
        <div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="card border-success" style={{ height: "300px", width: "100%" }}>
                        <form onSubmit={handleSubmit} className="border p-2 rounded">

                            <h5 className="text-primary">
                                <i className="fa-solid fa-plus"></i> Update Password
                            </h5>

                            <div className="mt-2">
                                <h6>Old Password</h6>
                                <input
                                    type="password"
                                    name='op'
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mt-2">
                                <h6>New Password</h6>
                                <input
                                    name="np"
                                    type='password'
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mt-2">
                                <h6>Confirm Password</h6>
                                <input
                                    type="password"
                                    name="cnp"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary mt-2" style={{ background: "#062326e2" }}>
                                Update Password
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Password;