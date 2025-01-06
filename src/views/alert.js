import React, { useEffect, useState } from "react";
import Spinner from "./spinner";
import helpers from "../js/functions";
import "../css/alert.css";
import moment from "moment";

const PetAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const response = await helpers.getFoundReunitedPets();
        const { lost_pets = [], found_pets = [] } = JSON.parse(response.body || "{}");

        const petAlerts = [
          ...lost_pets.map((pet) => ({
            id: pet.id,
            name: pet.petsname,
            photo: pet.photoURL,
            message: `${pet.petsname} was found`,
          })),
          ...found_pets.map((pet) => ({
            id: pet.id,
            name: "this pet",
            photo: pet.photoURL,
            message: `Reunited with owner`,
          })),
        ];

        setAlerts(petAlerts);
      } catch (error) {
        console.error("Error fetching pet alerts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlertIndex((prevIndex) => (prevIndex + 1) % alerts.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [alerts]);

  if (loading) {
    return <Spinner />;
  }

  if (alerts.length === 0) {
    return null;
  }

  const currentAlert = alerts[currentAlertIndex];

  return (
    <div className="pet-alert alert d-flex align-items-center">
      <img
        src={currentAlert.photo}
        alt={currentAlert.name}
        className="alert-photo"
      />
      <div className="alert-content">
        <h5 className="alert-title"><i class="fa-thin fa-party-horn"></i> <span className="ms-2">{currentAlert.message}</span></h5>
        {/* <p className="alert-description">
          {moment(currentAlert.date).format('MMM Do')}
        </p> */}
      </div>
    </div>
  );
};

export default PetAlerts;


