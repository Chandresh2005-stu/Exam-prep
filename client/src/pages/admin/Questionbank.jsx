import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuestionBank = () => {
  const [formData, setFormdata] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    subject:"",
  });

  const[questions, setQuestions]=useState([]);
  const[subjects, setSubjects]=useState([]);
  const [id, setId] = useState({ id: '' });
  const [editform, setEditForm] = useState(false); 
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editform) {
        const res = await axios.put(`http://localhost:5000/api/question/${id.id}`, formData);
        if (res) {
          alert('Question updated successfully');
        }
      } else {
        const res = await axios.post('http://localhost:5000/api/question', formData);
        if (res) {
          alert('Question added successfully');
        }
      }

      setFormdata({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
        subject:"",
      });
      setEditForm(false); 
      setId({ id: '' });
      handlefetch();
    } catch (err) {
      console.log(err);
      alert("Sorry, try again later");
    }
  };

  const handlefetch = async () => {
    const res = await axios.get('http://localhost:5000/api/question');
    setData(res.data.data);

    const res1 = await axios.get('http://localhost:5000/api/subject');
    setSubjects(res1.data.data);
  };

  useEffect(() => {
    handlefetch();
  }, []); 

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/question/${id}`);
      if (res) {
        alert("Deleted Successfully");
        handlefetch();
      }
    } catch (err) {
      alert("Try Again Later");
    }
  };

  const handleEdit = (q) => {
    setFormdata({
      question: q.question,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      correctAnswer: q.correctAnswer
    });
    setId({ id: q._id });
    setEditForm(true);
  };

  return (
    <div className="container-fluid p-0">
      <div className="row">
        <div className="col-sm-12">
          <div className="card border-primary" style={{ minHeight: "280px", width: "100%" }}>
            <form onSubmit={handleSubmit} className="border p-2 rounded">
              <div className="row">
                <div className="col-sm-12 ">
                  <h5><i className="fa-solid fa-plus"></i> {editform ? 'Edit Question' : 'Add Question'}</h5>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                    <h5 className='mt-1'>Question</h5>
                  <textarea
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    required
                    className="form-control"
                    placeholder="Enter Question Here"
                  ></textarea>
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="optionA"
                    placeholder="a.) Option 1"
                    className="form-control"
                    value={formData.optionA}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="optionB"
                    placeholder="b.) Option 2"
                    className="form-control"
                    value={formData.optionB}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="optionC"
                    placeholder="c.) Option 3"
                    className="form-control"
                    value={formData.optionC}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="optionD"
                    placeholder="d.) Option 4"
                    className="form-control"
                    value={formData.optionD}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-sm-6">
                    
                  <input
                    name="correctAnswer"
                    className="form-control"
                    placeholder="Correct Option"
                    value={formData.correctAnswer}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='col-sm-6'> 
                   <select name='subject' value={formData.subject} 
                   onChange={handleChange} className='form-select'required>
                    <option value=""> Select Subject</option>
                   {subjects.map((sub)=>(
                    <option key={sub._id} value={sub._id}>{sub.name}</option>
                   ))}
                   </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-2" style={{ background: "#0f0e47" }}>
                {editform ? "Update Question" : "Add Question"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="card mx-auto mt-3 border-primary" style={{ width: "100%" }}>
        <div className="card-body">
          <h3>Question List</h3>
          <table className="table table-bordered text-center">
            <thead className="table-primary">
              <tr>
                <th>S.No.</th>
                <th>Question</th>
                <th>Subject</th>
                <th>Option 1</th>
                <th>Option 2</th>
                <th>Option 3</th>
                <th>Option 4</th>
                <th>Correct Option</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((q, index) => (
                <tr key={q._id}>
                  <td>{index + 1}</td>
                  <td>{q.question}</td>
                  <td>{q.subject?.name}</td>
                  <td>{q.optionA}</td>
                  <td>{q.optionB}</td>
                  <td>{q.optionC}</td>
                  <td>{q.optionD}</td>
                  <td>{q.correctAnswer}</td>
                  <td>
                    <button className="btn btn-success me-2" onClick={() => handleEdit(q)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(q._id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan="8">No questions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuestionBank;