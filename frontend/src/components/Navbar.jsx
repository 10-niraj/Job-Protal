import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        Job<span>Profile</span>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/jobs">Jobs</Link>
      </div>

    </nav>
  );
}

export default Navbar;