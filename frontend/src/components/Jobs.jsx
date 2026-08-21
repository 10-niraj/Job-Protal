import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:5000/api/jobs";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({

    companyName: "",timing: "",city: "",salary: "",job: "",jobType: ""});

  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


  const fetchJobs = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to fetch jobs");
        return;
      }

      setJobs(data.jobs || []);
    } catch (error) {
      console.error(error);
      setError("Backend server is not running.");
    }};

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (form.jobType !== "Government" &&
        form.jobType !== "Private") {
      setError("Select Government or Private");
      return;
    }

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
      fetchJobs();

    } catch (error) {
      console.error(error);
      setError("Backend server is not running.");
    }
};

  const handleEdit = (job) => {
    setEditId(job.id);
    setForm({
      companyName: job.companyName,
      timing: job.timing,
      city: job.city,
      salary: job.salary,
      job: job.job,
      jobType: job.jobType
    });
};

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) {
      return;
    }
    try {
     const response = await fetch(
        `${API_URL}/${id}`,
        {method: "DELETE"}
      );

      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }

      setMessage(data.message);
      fetchJobs();

    } catch (error) {
      console.error(error);
      setError("Backend server is not running.");
    }
  };

  const resetForm = () => {
    setForm({
      companyName: "",timing: "",city: "",salary: "",job: "",jobType: "" });
    setEditId(null);
  };

  return (
    <div className="page-container">
      <h1>Job Management</h1>
      <p>Government and Private Jobs</p>

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
          {editId ? "Edit Job" : "Add Job"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            <input name="companyName"placeholder="Company Name"value={form.companyName}onChange={handleChange}required />

            <input name="timing" placeholder="Timing" value={form.timing} onChange={handleChange} required />

            <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />

            <input name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} required />

            <input name="job" placeholder="Job" value={form.job} onChange={handleChange} required />


            <select name="jobType" value={form.jobType} onChange={handleChange} required >
      ``         <option value=""> Select Job Type  </option>
              <option value="Government"> Governmen </option>
              <option value="Private"> Private </option>
            </select>


          </div>

          <button type="submit" className="primary-btn" >
            {editId ? "Update Job" : "Add Job"}
          </button>


          {editId && (
            <button type="button" className="cancel-btn" onClick={resetForm} >
              Cancel
            </button>
          )}
        </form>
      </div>


      <div className="list-card">
        <h2>Jobs List</h2>

        {jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (

          <div className="job-grid">
            {jobs.map((job) => (

              <div
                className="job-card"
                key={job.id}
              >
                <h3>{job.job}</h3>
                
                <p>  <b>Company:</b> {job.companyName}</p>
            
                <p>  <b>City:</b> {job.city}</p>

               <p> <b>Timing:</b> {job.timing} </p>

                <p> <b>Salary:</b> ₹{job.salary} </p>

                <p> <b>Type:</b> {job.jobType} </p>

                <button 
                className="edit-btn"
                  onClick={() => handleEdit(job)} >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(job.id)} >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )};
  
export default Jobs;