import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg" style={{background:"#5568D9"}}>
        <div className="container-fluid">
            <Link to='/' className="navbar-brand merriweather-black white" style={{fontSize:"30px", color:"white"}}>PawFinder NOLA</Link>
            <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon white"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <Link to="/report" class="nav-link" aria-current="page">Report Lost Pet</Link>
            </div>
            <div className="navbar-nav">
                <Link to="/confirm-identity" class="nav-link" aria-current="page">View Your Posts</Link>
            </div>
            </div>
        </div>
        </nav>
    )
}

export default NavBar;