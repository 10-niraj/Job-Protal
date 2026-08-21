import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">

      <div className="home-card">

        <div className="home-icon">
          💼
        </div>

        <h1> Job Profile Portal </h1>

        <p> Manage user profiles and discover
          Government and Private job opportunities.</p>

        <div className="home-buttons">

          <Link to="/users" className="home-btn">
            👤 Manage Users
          </Link>

          <Link to="/jobs"  className="home-btn" >
            💼 Manage Jobs
          </Link>

        </div>
      </div>
    </main>
  )};

export default Home;