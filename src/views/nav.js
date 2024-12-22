import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <Link to='/' className="navbar-brand">PawFinder</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
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