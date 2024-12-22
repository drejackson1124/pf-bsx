import React, { useEffect, useState, useRef } from 'react';
import helpers from '../js/functions';
import '../css/petfeed.css';
import NeighborhoodMap from './map';
import DualAddressComponent from './dualac';
import Spinner from './spinner';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function PetFeed() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const missingRef = useRef(null);
  const [reportSightingModal, setReportSightingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const apiKey = 'AIzaSyDGOaU4mr87R31882irdrvpJdm6TlWuw4I'; 
  const [confirmSightingDisabled, setconfirmSightingDisabled] = useState(false);

  useEffect(() => {
    async function fetchPets() {
      try {
        const data = await helpers.getPetFeed();
        setPets(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchPets();
  }, []);

  useEffect(() => {

  }, [reportSightingModal]);

  useEffect(() => {
    if (!missingRef.current || !window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(missingRef.current, {
      types: ['(cities)'],
      componentRestrictions: { country: 'us' },
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.address_components) return;

      // let tempStreet = "";
      let tempCity = "";
      let tempState = "";

      place.address_components.forEach(component => {
        const types = component.types;
        if (types.includes('locality')) {
          tempCity = component.long_name;
        }
        if (types.includes('administrative_area_level_1')) {
          tempState = component.short_name;
        }
      });

      const formattedAddress = `${tempCity}, ${tempState}`.trim();

      setCity(tempCity);
      setState(tempState);
      setAddress(formattedAddress);
    });
  }, [apiKey]);

  const handleDetailsClick = (pet) => {
    const address = pet.street + ',' + ' ' + pet.city + ',' + ' ' + pet.state;
    setSelectedPet(pet);
    setAddress(address);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPet(null);

  };

  const handleOpenReportSightingModal = () => {
    setShowModal(false);
    setReportSightingModal(true)
  };

  const handleCloseRPM = () => {
    setReportSightingModal(false)
  };

  const handleLostPetSearch = async () => {
    let obj = { city, state };
    let response = await helpers.findLostPets(obj);
    let result = JSON.parse(response);
    setPets(result);
  }

  const handlePNChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  const onAddressChange = (obj) => {
    setStreet(obj.street);
    setCity(obj.city);
    setState(obj.state);
  }

  const confirmSighting = async () => {

    setconfirmSightingDisabled(true);

    const obj = {
      street,
      city,
      state,
      date: moment().format(),
      phonenumber: phone,
      id: selectedPet.id
    }
    const response = await helpers.reportSighting(obj);
    
    if(response.statusCode === 200) {
      handleCloseRPM();
      setconfirmSightingDisabled(false);
      setAddress("");
      navigate('/');
    } else {
      setconfirmSightingDisabled(false);
      alert('Something went wrong. Please try again.');
      navigate('/');
    }
  }

  // just something here

  return (
    <div className="container pet-feed-container">
      <h1 className="pet-feed-title text-center mb-4">Lost Pets</h1>
      {/* {isLoading && <Spinner />} */}
      <div class="input-group mb-4">
        <input type="text" 
          class="form-control" 
          aria-label="citystate" 
          placeholder="City, State"
          ref={missingRef}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          id="LPAddress"
          />
        <button 
          class="input-group-text"
          value={address} 
          onClick={(e) => { handleLostPetSearch() }}>Search
        </button>
      </div>
      {error && (
        <div className="alert alert-danger text-center pet-feed-error" role="alert">
          Error: {error}
        </div>
      )}

      {pets.length === 0 ? (
        <div className="text-center">No pets have been reported lost in this area.</div>
      ) : (
        pets.map((pet) => (
          <div key={pet.id} className="row g-3 justify-content-center mb-4">
            <div className="col-12 col-md-8 offset-md-2">
              <div className="card pet-card h-100">
                {pet.photoURL && (
                  <img
                    src={pet.photoURL}
                    alt={pet.name}
                    className="card-img-top pet-photo img-fluid"
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h2 className="card-title pet-name">{pet.petsname}</h2>
                  {/* <p className="card-text pet-description">{pet.description}</p> */}
                  <p className="card-text pet-description">{pet.street}, {pet.city}, {pet.state}</p>
                  <div className="d-flex gap-2">
                    {/* <button className="btn spot-button">
                      Have You Seen Me?
                    </button> */}
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleDetailsClick(pet)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {showModal && selectedPet && (
        <div
          className="modal fade show"
          id="detailsModal"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedPet.petsname} - Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3 text-center">
                  {selectedPet.photoURL && (
                    <img
                      src={selectedPet.photoURL}
                      alt={selectedPet.petsname}
                      className='img-fluid'
                    />
                  )}
                </div>
                <p><strong>Name:</strong> {selectedPet.petsname}</p>
                <p><strong>Description:</strong> {selectedPet.description}</p>
                <p><strong>Reported Lost At:</strong> {address}</p>

                <NeighborhoodMap neighborhoodName={address}/>
              </div>
              {selectedPet.sightings && (
                <div className="sightings text-center">
                  <hr/>
                  <h3>Reported Sightings</h3>
                  <div className="ul text-start mx-2">
                    {selectedPet.sightings.map((lastSeen) => {
                      return (
                        <div key={lastSeen.id} className="li mb-2">
                          <span className="seenLocation">{lastSeen.street}, {lastSeen.city}, {lastSeen.state}</span> <span className="seenTimeStamp">{moment(lastSeen.date).fromNow()}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={handleOpenReportSightingModal}>
                  I Saw This Pet!
                </button>
                <button type="button" className="btn btn-danger" onClick={handleCloseModal}>
                  Report Post
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    {reportSightingModal && selectedPet && (
        <div
          className="modal fade show"
          id="reportModal"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sighting Details for {selectedPet.petsname}</h5>
              </div>
              <div className="modal-body">
                <div className="mb-3 text-center">
                <form className="reportForm">
                  <div className="mb-3">
                    <img src={selectedPet.photoURL} className='img-fluid'/>
                  </div>
                <DualAddressComponent petsname={selectedPet.petsname} onAddressChange={onAddressChange}/>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={handlePNChange}
                  placeholder="Please enter a good contact number"
                  maxLength="10"
                  pattern="\d{10}"
                  required
                  className={error ? 'input-error form-control mt-3' : 'form-control mt-3'}
                />
                </form>
                </div>
              </div>
              <div className="modal-footer">
                <button disabled={confirmSightingDisabled} type="button" className="btn btn-success" onClick={confirmSighting}>
                  Confirm
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCloseRPM}>
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

export default PetFeed;





