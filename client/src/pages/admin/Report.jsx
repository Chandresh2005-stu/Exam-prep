import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Reportgeneration = () => {
  const [data, setData] = useState([]);

  const handlefetch = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/exams/report');
      setData(res.data);
    } catch (er) {
      alert("Sorry, fetching reports failed");
    }
  };

  useEffect(() => {
    handlefetch();
  }, []);

  const handlePrint = (item) => {
    const printWindow = window.open('', '', 'width=800,height=600');
    const htmlContent = `
      <html>
        <head>
          <title>Examination Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            td, th { padding: 10px; border: 1px solid #333; text-align: left; }
          </style>
        </head>
        <body>
          <h2>Examination Report</h2>
          <table>
            <tr><th>Exam Name:</th><td>${item.examTitle}</td></tr>
            <tr><th>Examinee:</th><td>${item.examineeName}</td></tr>
            <tr><th>Email:</th><td>${item.examineeEmail}</td></tr>
            <tr><th>Total Marks:</th><td>${item.totalMarks}</td></tr>
            <tr><th>Passing Marks:</th><td>${item.passingMarks}</td></tr>
            <tr><th>Score:</th><td>${item.score}</td></tr>
            <tr><th>Status:</th><td>${item.status}</td></tr>
            <tr><th>Date of Exam:</th><td>${new Date(item.attemptedAt).toLocaleString()}</td></tr>
          </table>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div
      className="card mx-auto mt-2"
      style={{ width: "95%", maxWidth: "1300px", borderRadius: "12px" }}
    >
      <div className="card-body">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="fw-bold text-dark">Report Generation</h3>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-12">
            <table className="table table-bordered table-hover text-center">
              <thead className="table-primary">
                <tr>
                  <th>S.No.</th>
                  <th>Exam Name</th>
                  <th>Examinee</th>
                  <th>Examinee Email</th>
                  <th>Total Marks</th>
                  <th>Passing Marks</th>
                  <th>Score</th>
                  <th>Status</th>
                  <th>Date Of Exam</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, i) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>{item.examTitle}</td>
                    <td>{item.examineeName}</td>
                    <td>{item.examineeEmail}</td>
                    <td>{item.totalMarks}</td>
                    <td>{item.passingMarks}</td>
                    <td>{item.score}</td>
                    <td>{item.status}</td>
                    <td>{new Date(item.attemptedAt).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handlePrint(item)}
                      >
                        Print
                      </button>
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

export default Reportgeneration;