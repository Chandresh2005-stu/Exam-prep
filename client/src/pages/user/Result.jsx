import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Result = () => {
  const [data, setData] = useState([])
  const userId = localStorage.getItem('userId')

  const handlefetch = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/exams/examinee-result/${userId}`);
      console.log("Fetched result:", res.data);

      setData(Array.isArray(res.data.message) ? res.data.message : []);
    } catch (err) {
      console.error("Error fetching results:", err);
    }
  }

  useEffect(() => {
    handlefetch()
  }, [])

  return (
    <div>
      <h2>Your Exam Results</h2>
      <table className="table">
        <thead>
          <tr>
            <td>S.N</td>
            <td>Exam name</td>
            <td>Your Name</td>
            <td>Total Marks</td>
            <td>Score</td>
            <td>Passing Marks</td>
            <td>Status</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, i) => (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.examId?.title || "N/A"}</td>
                <td>{item.examineeId?.name || "N/A"}</td>
                <td>{item.totalMarks}</td>
                <td>{item.score}</td>
                <td>{item.passingMarks}</td>
                <td>{item.status}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No results found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Result
