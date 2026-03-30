import React from 'react';

const Adhome = () => {
  return (
    <div className="container py-5">
      {/* Info Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Total Exams</h5>
              <p className="display-6 text-primary">12</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Total Examinees</h5>
              <p className="display-6 text-success">158</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Total Subjects</h5>
              <p className="display-6 text-warning">10</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Exams Table */}
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          Recent Exams
        </div>
        <div className="card-body p-0">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>Exam Name</th>
                <th>Date</th>
                <th>Students</th>
              </tr>
            </thead>
           
          </table>
        </div>
      </div>
    </div>
  );
};

export default Adhome;
