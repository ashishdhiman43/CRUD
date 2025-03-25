import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const API_URL = "http://localhost:5000/users";
const URL_UPDATE =  "http://localhost:5000/update";
const URL_DELETE =  "http://localhost:5000/delete";

const App = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({name: "", email: "", age: "", salary: "", designation: "", address: "" });
  const [id, setId] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setUsers([]);
   
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const clearUserList = () => {
    setUsers([]);
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlefetch = (e) =>{
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, form);
      fetchUsers();
      setForm({name: "", email: "", age: "", salary: "", designation: "", address: "" });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const fetchDetails = async () => {
    if (!id) {
      alert("Please enter a valid ID");
      return;
    }
    setLoading(true);
    try {
      console.log("fetching user details error",id);
      const response = await axios.get(`${API_URL}/${id}`);
      console.log("Fetched Data:",response.data);
      if(!response.data){
        alert("No user found with this ID");
        return;
      }
      setForm({
        name: response.data.name || "",
        email: response.data.email || "",
        age: response.data.age || "",
        salary: response.data.salary || "",
        designation: response.data.designation || "",
        address: response.data.address || "",
      });
      setMessage("");
    } catch (error) {
      console.error("Error fetching user details:", error);
      setMessage("Failed to fetch user details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async () => {
    if (!data.name || !data.email || !data.age || !data.salary || !data.designation || !data.address) {
      alert("All fields are required");
      return;
    }
    setLoading(true);
    try {
      await axios.put(`${URL_UPDATE}/${data.id}`, data);
      setMessage("Item updated successfully!");
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("Failed to update item. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const deleteuser = async () =>{
    if(!id){
      alert("Please enter a valid ID");
      return;
    }
    setLoading(true);
    try{
      await axios.delete(`${URL_DELETE}/${id}`);
      setMessage("Item deleted successfully!");
      fetchUsers(); 
      setForm({ name: "", email: "", age: "", salary: "", designation: "", address: "" }); // Clear the form
    setId("");
    }catch(error){
      console.error("Error deleting user:", error);
      setMessage("Failed to delete item. Please try again.");
    }
  }

  return (
    <div className="container">
      <h2>User Management</h2>
      <input
          type="text"
          placeholder="Enter ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="Fetch_ID"
        />
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => (
          <div key={key}>
            <input
              type="text"
              name={key}
              placeholder={`Enter ${key}`}
              value={form[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Add User</button>
        <button onClick={fetchDetails} className="Fetch_Button">
          Fetch Details
        </button>
        <button onClick={deleteuser} className="deleteuser">
          Delete</button><br/>
          <button onClick={updateUser} className="updateuser">
          Update</button>
          <button onClick={fetchUsers} className="showdata">
          show data</button>
      </form>
      <h3>Users List</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.id} - {user.name} - {user.email} - {user.age} - {user.salary} - {user.designation} - {user.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;