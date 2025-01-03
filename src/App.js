import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from "./views/nav";
import PetFeed from "./views/petfeed";
import ReportLostPet from "./views/report";
import Footer from "./views/footer";
import './App.css';
import LostPetsMap from "./views/lostpetsmap";
import Posts from "./views/posts";
import ConfirmIdentity from "./views/confirmidentity";
import { UserProvider } from "./views/UserContext";
import FoundPetForm from "./views/foundpetform";
import SignUp from "./views/signup";
import Login from "./views/login";
import Dashboard from "./views/dashboard";


function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [userPets, setUserPets] = useState([]);

  const signOut = () => {
    setisAuthenticated(false);
    <Navigate to="/"/>
  }

    return (
      <UserProvider>
        <div className="App">
              <Router>
                <NavBar auth={isAuthenticated} signout={signOut}/>
                <Routes>
                  <Route path="/" element={<PetFeed />} />
                  <Route path="/report" element={<ReportLostPet />} />
                  <Route path="/lostpetsmap" element={<LostPetsMap/>} />
                  <Route path="/confirm-identity" element={<ConfirmIdentity/>} />
                  <Route path="/found-pet-form" element={<FoundPetForm/>} />
                  <Route path="/signup" element={<SignUp/>} />
                  <Route path="/login" element={<Login setAuth={setisAuthenticated} setUserPets={setUserPets}/>} />
                  
                  {/* Protected Route */}
                  <Route
                    path="/dashboard"
                    element={isAuthenticated ? <Dashboard userPets={userPets} signout={signOut}/> : <Navigate to="/login" />}
                  />
                </Routes>
              </Router>
          {/* <Footer /> */}
        </div>
      </UserProvider>
    );
  }

export default App;
