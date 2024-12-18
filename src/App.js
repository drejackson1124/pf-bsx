import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./views/nav";
import PetFeed from "./views/petfeed";
import ReportLostPet from "./views/report";
import Footer from "./views/footer";
import LostPetsMap from "./views/lostpetsmap";


function App() {
  return (
    <div className="App">
          <Router>
            <NavBar/>
            <Routes>
              <Route path="/" element={<PetFeed />} />
              <Route path="/report" element={<ReportLostPet />} />
              <Route path="/lostpetsmap" element={<LostPetsMap/>} />
            </Routes>
          </Router>
      <Footer />
    </div>
  );
}

export default App;
