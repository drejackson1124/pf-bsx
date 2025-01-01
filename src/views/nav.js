import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <Link to='/' className="navbar-brand merriweather-black" style={{fontSize:"20px", color:"black", borderBottom:"2px solid black"}}><i class="fa-solid fa-paw"></i> PawFinder NOLA</Link>
            <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fa-solid fa-list"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <Link to="/report" className="nav-link black" aria-current="page">Report Lost Pet</Link>
            </div>
            <div className="navbar-nav">
                <Link to="/found-pet-form" className="nav-link black" aria-current="page">Report Found Pet</Link>
            </div>
            <div className="navbar-nav">
                <Link to="/confirm-identity" className="nav-link black" aria-current="page">View Your Posts</Link>
            </div>
            </div>
        </div>
        </nav>
    )
}

export default NavBar;