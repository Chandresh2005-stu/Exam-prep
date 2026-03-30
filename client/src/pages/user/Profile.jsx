import React from 'react';

const Profile = () => {
    // Dummy data
    const exams = [
        { id: 1, name: 'Maths', obtained: 40, total: 50, status: 'Passed' },
        { id: 2, name: 'Science', obtained: 35, total: 50, status: 'Passed' },
        { id: 3, name: 'History', obtained: 20, total: 50, status: 'Failed' },
    ];

    return (
        <div>
            {/* Profile Cards */}
            <div className="container pt-4">
                <div className="row">
                    <div className="col-sm-6 d-flex justify-content-center mb-3">
                        <div className="card text-center bg-light" style={{ height: "280px", width: "300px" }}>
                            <div className="card-body d-flex flex-column justify-content-center">
                                <h4 className="card-title">Total Exams</h4>
                                <p className="display-4 text-primary">5</p>
                                <p className="text-muted">Exams Appeared</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 d-flex justify-content-center mb-3">
                        <div className="card text-center bg-light" style={{ height: "280px", width: "300px" }}>
                            <div className="card-body d-flex flex-column justify-content-center">
                                <h4 className="card-title">Performance Review</h4>
                                <p className="display-4 text-success">80%</p>
                                <p className="text-muted">Average Score</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Exam Table */}
            <div className="container">
                <div className="row pt-3">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="mb-3">Exam Results</h5>
                                <table className='table table-bordered table-hover text-center table-striped'>
                                    <thead className='table-dark'>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Exams</th>
                                            <th>Obtained Marks</th>
                                            <th>Total Marks</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exams.map((exam, index) => (
                                            <tr key={exam.id}>
                                                <td>{index + 1}</td>
                                                <td>{exam.name}</td>
                                                <td>{exam.obtained}</td>
                                                <td>{exam.total}</td>
                                                <td className={exam.status === 'Passed' ? 'text-success' : 'text-danger'}>
                                                    {exam.status}
                                                </td>
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
    );
};

export default Profile;
