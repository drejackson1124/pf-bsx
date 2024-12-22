import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./views/nav";
import PetFeed from "./views/petfeed";
import ReportLostPet from "./views/report";
import Footer from "./views/footer";
import LostPetsMap from "./views/lostpetsmap";
import Posts from "./views/posts";
import ConfirmIdentity from "./views/confirmidentity";
import { UserProvider } from "./views/UserContext";


function App() {
    return (
      <UserProvider>
        <div className="App">
              <Router>
                <NavBar/>
                <Routes>
                  <Route path="/" element={<PetFeed />} />
                  <Route path="/report" element={<ReportLostPet />} />
                  <Route path="/lostpetsmap" element={<LostPetsMap/>} />
                  <Route path="/confirm-identity" element={<ConfirmIdentity/>} />
                </Routes>
              </Router>
          {/* <Footer /> */}
        </div>
      </UserProvider>
    );
  }

export default App;
