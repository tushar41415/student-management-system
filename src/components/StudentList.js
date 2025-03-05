import React, { useEffect, useState } from "react";
import { getStudents, searchStudents, deleteStudent } from "../api/studentApi";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search Query
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Search Function
  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      fetchStudents(); // Agar search empty ho to full list dikhaye
    } else {
      try {
        const data = await searchStudents(searchQuery);
        setStudents(data);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  // 🗑️ Delete Function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id);
        setStudents(students.filter((student) => student._id !== id)); // UI se remove karo
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Student List</h2>

      {/* 🔍 Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-primary mt-2 me-2" onClick={handleSearch}>
          Search
        </button>
        <button className="btn btn-secondary mt-2" onClick={fetchStudents}>
          Reset
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>{student.course}</td>
                  <td>
                    <button
                      className="btn btn-info me-2"
                      onClick={() => navigate(`/student/${student._id}`)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No Students Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;
