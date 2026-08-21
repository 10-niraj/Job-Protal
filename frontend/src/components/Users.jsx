
import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:5000/api/users";

function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",email: "",contactNo: "",city: "",education: "", jobprofile: "" });

  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to fetch users");
        return;
      }

      setUsers(data.users || []);
    } catch (error) {
      console.error(error);
      setError("Backend server is not running.");

    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleChange = (e) => {
    setForm({  ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const url = editId
        ? `${API_URL}/${editId}`
        : API_URL;

      const method = editId
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json"
      },

        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      setMessage(data.message);
      resetForm();
      fetchUsers();

    } catch (error) {
      console.error(error);
      setError("Backend server is not running.");
    }
  };


  const handleEdit = (user) => {
    setEditId(user.id);
    setForm({
      name: user.name,email: user.email,contactNo: user.contactNo,
      city: user.city,education: user.education,jobprofile: user.jobprofile
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }

      setMessage(data.message);
      fetchUsers();

    } catch (error) {
      console.error(error);
      setError("Backend server is not running.");
    }
  };

   const resetForm = () => {
    setForm({
      name: "",email: "",contactNo: "",city: "",education: "",jobprofile: ""  });
    setEditId(null);
  };

  return (
    <div className="page-container">
      <h1>User Management</h1>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      <div className="form-card">
        <h2>
          {editId ? "Edit User" : "Add User"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />

            <input  name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />

            <input name="contactNo" placeholder="Contact Number" value={form.contactNo} onChange={handleChange} required />

            <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />

            <input name="education" placeholder="Education" value={form.education} onChange={handleChange} required />

            <input name="jobprofile" placeholder="Job Profile" value={form.jobprofile} onChange={handleChange} required />

          </div>

          <button type="submit" className="primary-btn">
            {editId ? "Update User" : "Add User"}
          </button>

          {editId && (

            <button type="button" className="cancel-btn" onClick={resetForm} >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="list-card">
        <h2>Users List</h2>
        {users.length === 0 ? (

          <p>No users found.</p>

        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>City</th>
                  <th>Education</th>
                  <th>Job Profile</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {users.map((user) => (

                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.contactNo}</td>
                    <td>{user.city}</td>
                    <td>{user.education}</td>
                    <td>{user.jobprofile}</td>

                    <td>

                      <button className="edit-btn"
                        onClick={() => handleEdit(user)} >
                        Edit
                      </button>

                      <button className="delete-btn"
                        onClick={() => handleDelete(user.id)}>
                        Delete
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )};

export default Users;