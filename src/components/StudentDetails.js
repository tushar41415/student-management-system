import React, { useEffect, useState } from "react";
import { getStudentById } from "../api/studentApi";
import { useParams, useNavigate } from "react-router-dom";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      const data = await getStudentById(id);
      setStudent(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Student Details</h2>

      {loading ? (
        <p>Loading...</p>
      ) : student ? (
        <div className="card p-3">
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Age:</strong> {student.age}</p>
          <p><strong>Course:</strong> {student.course}</p>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      ) : (
        <p>Student not found</p>
      )}
    </div>
  );
};

export default StudentDetails;
