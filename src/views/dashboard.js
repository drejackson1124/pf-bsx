// import React, { useEffect, useState } from "react";
// import '../css/dashboard.css';
// import Spinner from "./spinner";
// import moment from "moment";

// const Dashboard = (props) => {
//     const [pets, setPets] = useState(null);
//     const [selectedMessages, setSelectedMessages] = useState([]);
//     const [showModal, setShowModal] = useState(false);

//     useEffect(() => {
//         setPets(props.userPets);
//         console.log(props.userPets);
//     }, [props.userPets]);

//     const openModal = (messages) => {
//         console.log(messages);
//         setSelectedMessages(messages);
//         setShowModal(true);
//     };

//     const closeModal = () => {
//         setSelectedMessages([]);
//         setShowModal(false);
//     };

//     if (!pets) {
//         return <Spinner />;
//     }

//     const { lostpets, foundpets } = pets;

//     const archivedPetsCount = [
//         ...(lostpets || []),
//         ...(foundpets || [])
//     ].filter((pet) => pet.disabled).length;

//     return (
//         <div className="dashboard">
//             {/* Archive Section */}
//             <div className="archive-section text-center mt-4">
//                 <h5>
//                     <span className="badge bg-secondary ms-2">
//                         {archivedPetsCount} pets archived
//                     </span>
//                 </h5>
//             </div>

//             {/* Lost Pets Section */}
//             {lostpets && lostpets.length - archivedPetsCount > 0 ? (
//                 <div>
//                     <h3 className="text-center mt-4 merriweather-black">Your Lost Pets</h3>
//                     {lostpets.map((pet, index) => (
//                         !pet.disabled && (
//                             <div key={index} className="card my-3 dashboard-pet-cards">
//                                 <div className="card-body">
//                                     <div className="d-flex align-items-center">
//                                         <img 
//                                             src={pet.photoURL} 
//                                             alt={pet.petsname} 
//                                             className="lost-pet-img"
//                                         />
//                                         <div className="user-pet-info ms-3">
//                                             <h5 className="mb-1 merriweather-black">{pet.petsname}</h5>
//                                             <p className="mb-0">{pet.description}</p>
//                                         </div>
//                                     </div>
//                                     <button className="btn btn-outline-success mt-3">I found my pet.</button>
//                                 </div>
//                             </div>
//                         )
//                     ))}
//                 </div>
//             ) : (
//                 <div className="card dashboard-x-cards">
//                     <div className="card-body text-center">
//                         <i className="fa-solid fa-cat x-icon"></i>
//                         <h5>No lost pets posted</h5>
//                     </div>
//                 </div>
//             )}

//             {/* Found Pets Section */}
//             {foundpets && foundpets.length > 0 ? (
//                 <div>
//                     <h3 className="text-center mt-4 merriweather-black">Your Found Pets</h3>
//                     {foundpets.map((pet, index) => (
//                         !pet.disabled && (
//                             <div key={index} className="card my-3 dashboard-pet-cards">
//                                 <div className="card-body text-center">
//                                     <img 
//                                         src={pet.photoURL} 
//                                         className="img-fluid" 
//                                         style={{ borderRadius: "10px" }}
//                                     />
//                                     <p className="p-o mt-2">{pet.description}</p>
//                                     <span className="small-text">Posted {moment(pet.timefound).format('ll')}</span>
//                                     <h5 className="mt-5">
//                                         {pet.petsname}
//                                         {Array.isArray(pet.messages) && pet.messages.length > 0 ? (
//                                             <button 
//                                                 type="button" 
//                                                 className="btn btn-outline-primary position-relative"
//                                                 onClick={() => openModal(pet.messages)}
//                                             >
//                                                 Claims
//                                                 <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                                                     {pet.messages.length}
//                                                     <span className="visually-hidden">claims</span>
//                                                 </span>
//                                             </button>
//                                         ) : (
//                                             <button 
//                                                 type="button" 
//                                                 className="btn btn-outline-secondary position-relative disabled"
//                                             >
//                                                 No Claims
//                                             </button>
//                                         )}
//                                     </h5>
//                                 </div>
//                             </div>
//                         )
//                     ))}
//                 </div>
//             ) : (
//                 <div className="card mt-3 mt-4 dashboard-x-cards">
//                     <div className="card-body text-center">
//                         <i className="fa-solid fa-dog x-icon"></i>
//                         <h5>No found pets posted</h5>
//                     </div>
//                 </div>
//             )}

//             {/* Modal for Messages */}
//             {showModal && (
//                 <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
//                     <div className="modal-dialog modal-dialog-centered">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Claim Messages</h5>
//                                 <button 
//                                     type="button" 
//                                     className="btn-close" 
//                                     onClick={closeModal}
//                                 ></button>
//                             </div>
//                             <div className="modal-body">
//                                 {selectedMessages.map((message, index) => (
//                                     <div key={index} className="card mb-3">
//                                         <div className="card-body">
//                                             <p>{message}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div className="modal-footer">
//                                 <button 
//                                     type="button" 
//                                     className="btn btn-secondary" 
//                                     onClick={closeModal}
//                                 >
//                                     Close
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import "../css/dashboard.css";
import Spinner from "./spinner";
import moment from "moment";

const Dashboard = ({ userPets }) => {
    const [pets, setPets] = useState(null);
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setPets(userPets);
    }, [userPets]);

    const openModal = (messages) => {
        setSelectedMessages(messages);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedMessages([]);
        setShowModal(false);
    };

    if (!pets) {
        return <Spinner />;
    }

    const { lostpets, foundpets } = pets;

    const archivedPetsCount = [
        ...(lostpets || []),
        ...(foundpets || [])
    ].filter((pet) => pet.disabled).length;

    return (
        <div className="dashboard">
            {/* Archive Section */}
            <div className="archive-section text-center mt-4">
                <h5>
                    <span className="badge bg-secondary merriweather-black">
                        {archivedPetsCount} pets archived
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
                                    <button className="btn btn-outline-success mt-3 merriweather-black">I found my pet.</button>
                                </div>
                            </div>
                        )
                    )
                ) : (
                    <div className="card text-center mt-4 dashboard-x-cards merriweather-black">
                        <div className="card-body">
                            <i className="fa-solid fa-cat x-icon"></i>
                            <h5>No lost pets posted</h5>
                        </div>
                    </div>
                )}
            </section>

            {/* Found Pets Section */}
            <section>
                <h3 className="text-center mt-4 merriweather-black">Your Found Pets</h3>
                {foundpets && foundpets.length > 0 ? (
                    foundpets.map((pet, index) =>
                        !pet.disabled && (
                            <div key={index} className="card my-3 dashboard-pet-cards">
                                <div className="card-body text-center">
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
                                        {Array.isArray(pet.messages) && pet.messages.length > 0 ? (
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary position-relative merriweather-black"
                                                onClick={() => openModal(pet.messages)}
                                            >
                                                Claims
                                                <span className="badge bg-success ms-1">
                                                    {pet.messages.length}
                                                </span>
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary disabled"
                                            >
                                                No Claims
                                            </button>
                                        )}
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
        </div>
    );
};

export default Dashboard;



