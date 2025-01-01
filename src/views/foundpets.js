import React, { useEffect, useState } from "react";
import helpers from "../js/functions";
import Spinner from "./spinner";
import "../css/foundpets.css";
import moment from "moment";

const FoundPets = () => {
  const [foundPets, setFoundPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);

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
  };

  if (foundPets.length === 0) {
    return <Spinner />;
  } else {
    return (
      <div className="foundpet-container">
        <h1 className="found-pet-title text-center pt-4 pb-4 merriweather-black mb-0">Spotted Pets</h1>
        {/* <div className="curved-header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="black"
              fillOpacity="1"
              d="M0,160L48,176C96,192,192,224,288,218.7C384,213,480,171,576,138.7C672,107,768,85,864,74.7C960,64,1056,64,1152,80C1248,96,1344,128,1392,144L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div> */}
        <div className="carousel-container">
          <div className="cards-wrapper">
            {foundPets.map((pet) => (
              <div key={pet.id} className="card found-pet-card">
                {/* Photo */}
                <div className="pet-photo-container">
                  <img
                    src={pet.photoURL}
                    alt={pet.description}
                    className="pet-photo"
                  />
                </div>
                {/* Description and Button */}
                <div className="card-body">
                  <p className="pet-description">
                    {pet.description.length > 100
                      ? `${pet.description.slice(0, 100)}...`
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
            ))}
          </div>

          {/* Modal for detailed view */}
          {selectedPet && (
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
                  <div className="modal-body text-center">
                    <img
                      src={selectedPet.photoURL}
                      alt="Large View"
                      className="img-fluid"
                    />
                    <p className="mt-3">
                      <strong>Description:</strong> {selectedPet.description}
                    </p>
                    <p>
                      <strong>Location Found:</strong> {selectedPet.street},{" "}
                      {selectedPet.city}, {selectedPet.state}
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-primary"
                      onClick={() => alert("Claim pet functionality here.")}
                    >
                      Claim Pet
                    </button>
                    <button className="btn btn-secondary" onClick={closeModal}>
                      Close
                    </button>
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



