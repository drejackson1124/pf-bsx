// import React from "react";
// import { Link } from "react-router-dom";

// const NavBar = (props) => {
    
//     if(props.auth) {
//         return (
//             <nav className="navbar navbar-expand-lg">
//             <div className="container-fluid">
//                 <Link to='/' className="navbar-brand merriweather-black" style={{fontSize:"20px", color:"black", borderBottom:"2px solid black"}}><i class="fa-solid fa-paw"></i> PawFinder NOLA</Link>
//                 <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//                     <i class="fa-solid fa-list"></i>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//                 <div className="navbar-nav">
//                     <Link to="/report" className="nav-link black" aria-current="page">Report Lost Pet</Link>
//                 </div>
//                 <div className="navbar-nav">
//                     <Link to="/found-pet-form" className="nav-link black" aria-current="page">Report Found Pet</Link>
//                 </div>
//                 <div className="navbar-nav">
//                     <Link to="/dashboard" className="nav-link black" aria-current="page">Dashboard</Link>
//                 </div>
//                 <div className="navbar-nav">
//                     <div className="nav-link black btn-outline-primary" onClick={() => {props.signout()}}>Sign Out</div>
//                 </div>
//                 </div>
//             </div>
//             </nav>
//         )
//     } else {
//         return (
//             <nav className="navbar navbar-expand-lg">
//             <div className="container-fluid">
//                 <Link to='/' className="navbar-brand merriweather-black" style={{fontSize:"20px", color:"black", borderBottom:"2px solid black"}}><i class="fa-solid fa-paw"></i> PawFinder NOLA</Link>
//                 <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//                     <i class="fa-solid fa-list"></i>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//                 <div className="navbar-nav">
//                     <Link to="/report" className="nav-link black" aria-current="page">Report Lost Pet</Link>
//                 </div>
//                 <div className="navbar-nav">
//                     <Link to="/found-pet-form" className="nav-link black" aria-current="page">Report Found Pet</Link>
//                 </div>
//                 <div className="navbar-nav">
//                     <Link to="/signup" className="nav-link black" aria-current="page"><span className="blue">Sign Up</span> or <span className="blue">Log In</span></Link>
//                 </div>
//                 </div>
//             </div>
//             </nav>
//         )
//     }
// }

// export default NavBar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = (props) => {
    const navigate = useNavigate();

    const handleLinkClick = (path) => {
        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Navigate to the desired path
        navigate(path);
    };

    if (props.auth) {
        return (
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link
                        to="/"
                        className="navbar-brand merriweather-black"
                        style={{
                            fontSize: "20px",
                            color: "black",
                            borderBottom: "2px solid black",
                        }}
                    >
                        <i className="fa-solid fa-paw"></i> PawFinder NOLA
                    </Link>
                    <button
                        className="navbar-toggler bg-white"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fa-solid fa-list"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <span
                                onClick={() => handleLinkClick('/report')}
                                className="nav-link black"
                                aria-current="page"
                                role="button"
                            >
                                Report Lost Pet
                            </span>
                        </div>
                        <div className="navbar-nav">
                            <span
                                onClick={() => handleLinkClick('/found-pet-form')}
                                className="nav-link black"
                                aria-current="page"
                                role="button"
                            >
                                Report Found Pet
                            </span>
                        </div>
                        <div className="navbar-nav">
                            <span
                                onClick={() => handleLinkClick('/dashboard')}
                                className="nav-link black"
                                aria-current="page"
                                role="button"
                            >
                                Dashboard
                            </span>
                        </div>
                        <div className="navbar-nav">
                            <div
                                className="nav-link black btn-outline-primary"
                                onClick={() => {
                                    props.signout();
                                }}
                                role="button"
                            >
                                Sign Out
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    } else {
        return (
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link
                        to="/"
                        className="navbar-brand merriweather-black"
                        style={{
                            fontSize: "20px",
                            color: "black",
                            borderBottom: "2px solid black",
                        }}
                    >
                        <i className="fa-solid fa-paw"></i> PawFinder NOLA
                    </Link>
                    <button
                        className="navbar-toggler bg-white"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fa-solid fa-list"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <span
                                onClick={() => handleLinkClick('/report')}
                                className="nav-link black"
                                aria-current="page"
                                role="button"
                            >
                                Report Lost Pet
                            </span>
                        </div>
                        <div className="navbar-nav">
                            <span
                                onClick={() => handleLinkClick('/found-pet-form')}
                                className="nav-link black"
                                aria-current="page"
                                role="button"
                            >
                                Report Found Pet
                            </span>
                        </div>
                        <div className="navbar-nav">
                            <span
                                onClick={() => handleLinkClick('/signup')}
                                className="nav-link black"
                                aria-current="page"
                                role="button"
                            >
                                <span className="blue">Sign Up</span> or{" "}
                                <span className="blue">Log In</span>
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
};

export default NavBar;
