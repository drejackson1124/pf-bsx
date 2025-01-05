import React, { useEffect, useState } from "react";
import Spinner from "./spinner";
import helpers from "../js/functions";
import "../css/alert.css";

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
            message: `${pet.petsname} was found safe!`,
          })),
          ...found_pets.map((pet) => ({
            id: pet.id,
            name: "this pet",
            photo: pet.photoURL,
            message: `This pet has been reunited with their loving owner!`,
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
    }, 5000);

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
    <div className="pet-alert alert alert-info d-flex align-items-center">
      <img
        src={currentAlert.photo}
        alt={currentAlert.name}
        className="alert-photo"
      />
      <div className="alert-content">
        <h5 className="alert-title">{currentAlert.message}</h5>
        <p className="alert-description">
          Help us celebrate the happy ending for {currentAlert.name}!
        </p>
      </div>
    </div>
  );
};

export default PetAlerts;


