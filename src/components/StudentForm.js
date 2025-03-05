import React, { useState } from "react";
import { registerStudent } from "../api/studentApi";

const StudentForm = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerStudent(student);
      setMessage(res.message);
      setStudent({ name: "", email: "", age: "", course: "" }); // Form reset
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Student Registration</h2>
      {message && <p className="alert alert-info">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" value={student.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={student.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input type="number" name="age" className="form-control" value={student.age} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Course</label>
          <input type="text" name="course" className="form-control" value={student.course} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default StudentForm;
