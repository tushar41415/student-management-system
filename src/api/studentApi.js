import axios from "axios";

const API_URL = "http://localhost:5700/api/students"; // Apna backend URL

export const registerStudent = async (studentData) => {
  try {
    const response = await axios.post(API_URL, studentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Server Error" };
  }
};

export const getStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5700/api/students");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: "Server Error" };
    }
  };
  
  export const searchStudents = async (name) => {
    try {
      const response = await axios.get(`http://localhost:5700/api/students/search/${name}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: "Server Error" };
    }
  };
  

  export const getStudentById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5700/api/students/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: "Server Error" };
    }
  };
  
  export const deleteStudent = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5700/api/students/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: "Server Error" };
    }
  };
  