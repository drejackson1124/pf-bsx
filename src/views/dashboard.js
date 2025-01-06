import React, { useEffect, useState } from "react";
import "../css/dashboard.css";
import Spinner from "./spinner";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import helpers from "../js/functions";

const Dashboard = ({ userPets, email }) => {
    const [pets, setPets] = useState(null);
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [refresh, setRefresh] = useState(false);
    const [selectedSightings, setSelectedSightings] = useState([]);
    const [userConfirm, setUserConfirm] = useState(false);
    const [userConfirmReunited, setUserConfirmReunited] = useState(false);
    const [petId, setPetId] = useState("");

    useEffect(() => {
        const fetchPets = async () => {
            try {
                setLoading(true); 
                const response = await helpers.dashboardPets({ email }); 
                setPets(JSON.parse(response.body)); 
            } catch (error) {
                console.error("Error fetching pets:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, [location]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                setLoading(true); 
                const response = await helpers.dashboardPets({ email }); 
                setPets(JSON.parse(response.body)); 
            } catch (error) {
                console.error("Error fetching pets:", error);
            } finally {
                setLoading(false);
                
            }
        };

        fetchPets();
    }, [refresh]);

    useEffect(() => {
        setPets(userPets);
    }, [userPets]);

    const userFoundPet = async (id) => {
        const result = await helpers.userFoundPet({id})
        if(result.statusCode === 200){
            refresh === true ? setRefresh(false) : setRefresh(true);
            return true;
        } else {
            alert('Hmmm, something went wrong. Please try again.');
        }
    }

    const updateUserConfirm = (id) => {
        setUserConfirm(true);
        setPetId(id);
    }

    const updateUserConfirmReunited = (id) => {
        setUserConfirmReunited(true);
        setPetId(id);
    }

    const reunitedPet = async (id) => {
        const result = await helpers.petReunited({id});
        if(result.statusCode === 200){
            refresh === true ? setRefresh(false) : setRefresh(true);
        } else {
            alert("Something went wrong. Please try again.");
        }
    }

    const openModal = (messages) => {
        setSelectedMessages(messages);
        setShowModal(true);
    };

    const openModal2 = (messages) => {
        setSelectedSightings(messages);
        setShowModal2(true);
    };

    const closeModal = () => {
        setSelectedMessages([]);
        setShowModal(false);
    };

    const closeModal2 = () => {
        setSelectedSightings([]);
        setShowModal2(false);
    };

    const closeUCModal = async () => {
        setUserConfirm(false);
        const result = await userFoundPet(petId);
    };

    const closeUCModal2 = () => {
        setUserConfirm(false);
    };

    const closeUCRModal = async () => {
        setUserConfirmReunited(false);
        const result = await reunitedPet(petId);
    };

    const closeUCRModal2 = () => {
        setUserConfirmReunited(false);
    };

    if (loading) {
        return <Spinner />;
    }

    if (!pets) {
        return <Spinner />;
    }

    const { lostpets, foundpets } = pets;

    const archivedPetsCount = [
        ...(lostpets || []),
        ...(foundpets || [])
    ].filter((pet) => pet.disabled).length;

    const reunitedPetsCount = [
        ...(foundpets || [])
    ].filter((pet) => pet.reunited).length;

    let totalPets = archivedPetsCount + reunitedPetsCount;

    return (
        <div className="dashboard">
            {/* Archive Section */}
            <div className="d-flex archive-section justify-content-between mt-4 mx-3">
                <h5>
                    <span className="badge archived-badge mt-2">
                         {archivedPetsCount} pets archived
                    </span>
                </h5>
                {/* <h5>
                    <span className="badge bg-success merriweather-black mt-2">
                         {reunitedPetsCount} pets reunited
                     </span>
                </h5> */}
                <h5>
                    <span className="badge reunited-badge mt-2">
                         {reunitedPetsCount} pets reunited
                     </span>
                </h5>
            </div>

            {/* Lost Pets Section */}
            <section>
                <h3 className="text-center mt-4 merriweather-black">Your Lost Pets</h3>
                {lostpets && lostpets.length - archivedPetsCount > 0 ? (
                    lostpets.map((pet, index) =>
                        !pet.disabled && (
                            <div key={index} className="card my-3 dashboard-pet-cards">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={pet.photoURL}
                                            alt={pet.petsname}
                                            className="lost-pet-img"
                                        />
                                        <div className="user-pet-info ms-3">
                                            <h5 className="mb-1 merriweather-black">{pet.petsname}</h5>
                                            <p className="mb-0">{pet.description}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-around mt-3">
                                        <button
                                            className="btn btn-outline-success"
                                            onClick={() => updateUserConfirm(pet.id)}
                                        >
                                            I found my pet <i class="fa-thin fa-face-laugh ms-1"></i>
                                        </button>
                                        {Array.isArray(pet.sightings) && pet.sightings.length > 0 && (
                                            <button
                                                className="btn btn-outline-primary"
                                                onClick={() => openModal2(pet.sightings)}
                                            >
                                                Pet Sightings <i class="fa-thin fa-magnifying-glass ms-1"></i>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    )
                ) : (
                    <div className="card text-center mt-4 dashboard-x-cards merriweather-black">
                        <div className="card-body">
                            <i className="fa-solid fa-cat x-icon"></i>
                            <h5>No lost pets posted</h5>
                            <span className="">post a lost pet <Link to="/report" className="blue">here</Link></span>
                        </div>
                    </div>
                )}
            </section>

            {/* Found Pets Section */}
            <section>
                <h3 className="text-center mt-4 merriweather-black">Your Found Pets</h3>
                {foundpets && foundpets.length - reunitedPetsCount > 0 ? (
                    foundpets.map((pet, index) =>
                        !pet.disabled && !pet.reunited && (
                            <div key={index} className="card my-3 dashboard-pet-cards">
                                <div className="card-body text-start">
                                    <img
                                        src={pet.photoURL}
                                        className="img-fluid mb-2"
                                        style={{ borderRadius: "10px" }}
                                    />
                                    <p>{pet.description}</p>
                                    <span className="small-text">
                                        Posted {moment(pet.timefound).format("ll")}
                                    </span>
                                    <h5 className="mt-3">
                                        {pet.petsname}
                                        <div class="d-flex justify-content-around">
                                            {Array.isArray(pet.messages) && pet.messages.length > 0 ? (
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary position-relative merriweather-black"
                                                    onClick={() => openModal(pet.messages)}
                                                >
                                                    Claims <i class="fa-thin fa-bell ms-2"></i>
                                                    {/* <span className="badge bg-primary ms-1">
                                                        {pet.messages.length}
                                                    </span> */}
                                                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger claim-badge">
                                                        {pet.messages.length}
                                                        <span class="visually-hidden">New alerts</span>
                                                    </span>
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary disabled"
                                                >
                                                    No Claims <i class="fa-thin fa-bell ms-2"></i>
                                                </button>
                                            )}
                                            <button class="btn btn-outline-success" type="button" onClick={() => {
                                                updateUserConfirmReunited(pet.id);
                                            }}>Reunited with Owner <i class="fa-sharp fa-thin fa-face-smile-beam ms-2"></i></button>
                                            {/* <button class="btn btn-outline-secondary" type="button">Archive <i class="fa-thin fa-file-zipper ms-2"></i></button> */}
                                        </div>
                                    </h5>
                                </div>
                            </div>
                        )
                    )
                ) : (
                    <div className="card text-center mt-4 dashboard-x-cards merriweather-black">
                        <div className="card-body">
                            <i className="fa-solid fa-dog x-icon"></i>
                            <h5>No found pets posted</h5>
                            <span className="">post a found pet <Link to="/found-pet-form" className="blue">here</Link></span>
                        </div>
                    </div>
                )}
            </section>

            {/* Modal for Messages */}
            {showModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Claim Messages</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                {selectedMessages.map((message, index) => (
                                    <div key={index} className="card mb-3">
                                        <div className="card-body">
                                            <h6>{message.name}</h6>
                                            <p>{message.message}</p>
                                            <p>
                                                <strong>Date:</strong>{" "}
                                                {moment(message.date).format("LL")}
                                            </p>
                                            <p>
                                                <strong>Contact:</strong> {message.contactinfo}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal2 && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Reported Sightings</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeModal2}
                                ></button>
                            </div>
                            <div className="modal-body">
                                {selectedSightings.map((sighting, index) => (
                                    <div key={index} className="card mb-3">
                                        <div className="card-body">
                                            <p>
                                                <strong>Location:</strong> {sighting.street},{" "}
                                                {sighting.city}, {sighting.state}
                                            </p>
                                            <p>
                                                <strong>Date:</strong> {moment(sighting.date).format("LL")}
                                            </p>
                                            {/* <p>
                                                <strong>Contact:</strong> {sighting.phoneNumber}
                                            </p> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={closeModal2}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {userConfirm && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" style={{fontSize:"30px", fontWeight:"100"}}>Please confirm that you've found your pet.</h5>
                            </div>
                            <div className="modal-body">
                                <button className="btn btn-outline-success" onClick={closeUCModal} style={{fontSize:"25px", fontWeight:"100"}}>Yes, I've found my pet.</button>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={closeUCModal2}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {userConfirmReunited && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" style={{fontSize:"30px", fontWeight:"100"}}>Please confirm that you've reunited this pet with their family.</h5>
                            </div>
                            <div className="modal-body">
                                <button className="btn btn-outline-success" onClick={closeUCRModal} style={{fontSize:"25px", fontWeight:"100"}}>Yes, I've reunited this pet.</button>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={closeUCRModal2}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;






