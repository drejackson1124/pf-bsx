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
    );
  }
};

export default FoundPets;



