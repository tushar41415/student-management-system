import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import StudentDetails from "./components/StudentDetails";

const App = () => {
  return (
    <Router>
      <div>
        <h1 className="text-center mt-3">Student Management System</h1>
        <Routes>
          <Route path="/" element={<><StudentForm /><StudentList /></>} />
          <Route path="/student/:id" element={<StudentDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
