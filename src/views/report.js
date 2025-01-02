import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/report.css';
import helpers from "../js/functions";
import moment from "moment";

const ReportLostPet = () => {
  const missingRef = useRef(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [petsname, setPetsname] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [petType, setPetType] = useState("cat");
  const [date, setDate] = useState("");
  const [passcode, setPasscode] = useState("");
  const [activeSubmit, setActiveSubmit] = useState(false);
  const navigate = useNavigate();

  // Replace with your actual API key, ensuring Places API is enabled
  const apiKey = 'AIzaSyDGOaU4mr87R31882irdrvpJdm6TlWuw4I'; 

  useEffect(() => {
    if (!missingRef.current || !window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(missingRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'us' },
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.address_components) return;

      let tempStreet = "";
      let tempCity = "";
      let tempState = "";
      let tempZip = "";

      place.address_components.forEach(component => {
        const types = component.types;
        if (types.includes('street_number') || types.includes('route')) {
          // Street number and route together form the street address
          tempStreet += component.long_name + ' ';
        }
        if (types.includes('locality')) {
          tempCity = component.long_name;
        }
        if (types.includes('administrative_area_level_1')) {
          tempState = component.short_name;
        }
        if (types.includes('postal_code')) {
          tempZip = component.long_name;
        }
      });

      const formattedAddress = `${tempStreet.trim()}, ${tempCity}, ${tempState} ${tempZip}`.trim();

      setStreet(tempStreet.trim());
      setCity(tempCity);
      setState(tempState);
      setZipCode(tempZip);
      setAddress(formattedAddress);
    });
  }, [apiKey]);

  const createObj = async () => { 
    setActiveSubmit(true);
    let obj = {
        street,
        city,
        state,
        zipCode,
        description,
        petsname,
        email,
        photoURL,
        date: moment().format(),
        passcode
    };

    if(!obj.photoURL || !obj.email){
      alert('Please enter all details and resubmit.');
      setActiveSubmit(false);
      return;
    }

    const result = await helpers.reportLostPet(obj);
    if(result === 200){
        navigate('/');
    } else {
      alert('Please fill out all fields and try to submit again.');
      setActiveSubmit(false);
    }
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const base64 = evt.target.result;
        setPhotoURL(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="text-center">
      <form className="reportForm">

        <div className="mb-3">
          <label htmlFor="lostPetsName" className="form-label">Pet's Name</label>
          <input type="text" className="form-control form-control-lg" id="lostPetsName" onChange={(e) => {
            setPetsname(e.target.value);
          }}/>
        </div>

        {/* <ul class="list-group mb-3">
        <p>Pet Type</p>
        <li class="list-group-item">
            <input required class="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="firstRadio" checked={petType === "cat"} onChange={() => { updatePetType("cat") }}/>
            <label class="form-check-label" for="firstRadio">Cat</label>
        </li>
        <li class="list-group-item">
            <input required class="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="secondRadio" checked={petType === "dog"} onChange={() => { updatePetType("dog") }}/>
            <label class="form-check-label" for="secondRadio">Dog</label>
        </li>
        <li class="list-group-item">
            <input required class="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="thirdRadio" checked={petType === "other"} onChange={() => { updatePetType("other") }}/>
            <label class="form-check-label" for="thirdRadio">Other</label>
        </li>
        </ul> */}

              {/* Pet Type */}
      <div className="mb-3">
        <label className="form-label">Pet Type</label>
        <div>
          <label className="me-3">
            <input
              type="radio"
              value="Cat"
              name="petType"
              onChange={(e) => setPetType(e.target.value)}
              checked={petType === 'Cat'}
            />{' '}
            Cat
          </label>
          <label className="me-3">
            <input
              type="radio"
              value="Dog"
              name="petType"
              onChange={(e) => setPetType(e.target.value)}
              checked={petType === 'Dog'}
            />{' '}
            Dog
          </label>
          <label>
            <input
              type="radio"
              value="Other"
              name="petType"
              onChange={(e) => setPetType(e.target.value)}
              checked={petType === 'Other'}
            />{' '}
            Other
          </label>
        </div>
      </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Please give a description of your pet.</label>
          <input required type="text" className="form-control form-control-lg" id="description" onChange={(e) => {
            setDescription(e.target.value);
          }}/>
        </div>

        <div className="mb-3">
          <label required htmlFor="passcode" className="form-label">Please provide a passcode between 4-6 characters.</label>
          <input minLength="4" maxLength="6" required type="text" className="form-control form-control-lg" id="passcode" onChange={(e) => {
            setPasscode(e.target.value);
          }}/>
          <div id="emailHelp" className="form-text">You'll be able to view your postings with this passcode.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="missing" className="form-label">Where did your pet go missing?</label>
          <div id="emailHelp" className="form-text mb-2">(street, city, state)</div>
          <input
            required
            type="text"
            className="form-control form-control-lg"
            id="missing"
            ref={missingRef}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="formFileLg" className="form-label">Please upload a picture of your pet.</label>
          <input required className="form-control form-control-lg" id="formFileLg" type="file" onChange={handlePhotoChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input required type="email" className="form-control form-control-lg" id="emailAddress" aria-describedby="emailHelp" onChange={(e)=>{
            setEmail(e.target.value);
          }}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <button type="button" disabled={activeSubmit} className="btn btn-primary btn-lg mt-4" onClick={() => {
            createObj();
        }}>Submit</button>
      </form>
    </div>
  );
}

export default ReportLostPet;

