import React, { useEffect ,useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router'

const MyExam = () => {
  const[exam, setExam] = useState([]);

  const fetchExams = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/exams/exams`)
    setExam(res.data);
    //console.log(res.data);
  }

  useEffect(()=>{
    fetchExams();
  },[])

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 mx-2">
            <h4>My Exam</h4>
          </div>
        </div>
      </div>

      <div className="container-fluid pt-3">
        <div className="card">
          <div className="card-body">
            <table className='table table-bordered table-hover text-center table-striped'>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Exam Name</th>
                  <th>Date Of Exam</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {exam.map((item, i)=>(
                  <tr key={item._id}>
                    <td>{i+1}</td>
                    <td>{item.title}</td>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td>{item.time}</td>
                    <td>
                      <Link to={`/udash/getexam/${item._id}`} className='btn btn-primary'>
                        Start Exam
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyExam