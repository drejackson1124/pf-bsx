import React, { useEffect, useState } from "react";
import helpers from "../js/functions";
import Spinner from "./spinner";
import "../css/foundpets.css";
import moment from "moment";

const FoundPets = () => {
  const [foundPets, setFoundPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [name, setName] = useState("");
  const [contactinfo, setContactInfo] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchFoundPets = async () => {
      try {
        const response = await helpers.getFoundPets();
        setFoundPets(JSON.parse(response.body));
      } catch (error) {
        console.error("Error fetching found pets:", error);
      }
    };

    fetchFoundPets();
  }, []);

  const openModal = (pet) => {
    setSelectedPet(pet);
  };

  const closeModal = () => {
    setSelectedPet(null);
    setShowClaimForm(false);
  };

  const openClaimForm = () => {
    setShowClaimForm(true);
  };

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const result = await helpers.claimPet({name, contactinfo, message, date: moment().format(), id: selectedPet.id});
  
      if (result.statusCode === 200) {
        alert("Claim submitted successfully!");
        setShowClaimForm(false);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting claim:', error);
      alert('An unexpected error occurred.');
    }
  };
  


  if (foundPets.length === 0) {
    return <Spinner />;
  } else {
    return (
      <div className="foundpet-container">
        <h1 className="found-pet-title text-center pt-4 pb-4 merriweather-black mb-0">
          Spotted Pets
        </h1>
        <div className="carousel-container">
          <div className="cards-wrapper">
            {foundPets.map((pet) => (
              !pet.reunited && (
                <div key={pet.id} className="card found-pet-card">
                
                <div className="pet-photo-container">
                  <img
                    src={pet.photoURL}
                    alt={pet.description}
                    className="pet-photo"
                  />
                </div>
                
                <div className="card-body">
                  <p className="pet-description">
                    {pet.description.length > 50
                      ? `${pet.description.slice(0, 50)}...`
                      : pet.description}
                  </p>
                  <button
                    className="btn btn-sm btn-view-pet merriweather-black"
                    onClick={() => openModal(pet)}
                  >
                    View Pet
                  </button>
                </div>
              </div>
              )
            ))}
          </div>

          {/* Modal for detailed view */}
          {selectedPet && !showClaimForm && (
            <div
              className="modal fade show"
              style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Pet Details</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeModal}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <img
                      src={selectedPet.photoURL}
                      alt="Large View"
                      className="img-fluid"
                    />
                    <p className="mt-3">
                      <span className="bold">Description</span> <br/>{selectedPet.description}
                    </p>
                    <p>
                      <span className="bold">Location Found</span> <br/>{selectedPet.street}, {" "}
                      {selectedPet.city}, {selectedPet.state}
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-outline-primary"
                      onClick={openClaimForm}
                    >
                      Claim Pet
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal for claim form */}
          {selectedPet && showClaimForm && (
            <div
              className="modal fade show"
              style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Claim Pet</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeModal}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <img src={selectedPet.photoURL} className="img img-fluid"/>
                    <form onSubmit={handleClaimSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="contactInfo" className="form-label">
                          Email or Phone Number
                        </label>
                        <input
                          type="text"
                          id="contactInfo"
                          className="form-control"
                          onChange={(e) => setContactInfo(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="message" className="form-label">
                          Message
                        </label>
                        <textarea
                          id="message"
                          className="form-control"
                          rows="3"
                          onChange={(e) => setMessage(e.target.value)}
                          required
                        ></textarea>
                      </div>
                      <div className="modal-footer">
                        <button type="submit" className="btn btn-outline-success">
                          Submit Claim
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default FoundPets;



