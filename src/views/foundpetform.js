import React, { useState, useEffect, useRef } from 'react';
import helpers from '../js/functions';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function FoundPetForm() {
  const [description, setDescription] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [timeFound, setTimeFound] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [photo, setPhoto] = useState(null); // For storing the image file
  const [petType, setPetType] = useState(''); // New state for pet type
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passcode, setPasscode] = useState("");

  // 1. Use ref for autocomplete
  const locationRef = useRef(null);
  const navigate = useNavigate();

  // 2. Set up Google Autocomplete
  useEffect(() => {
    if (!locationRef.current || !window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(locationRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'us' },
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.address_components) return;

      let tempStreet = '';
      let tempCity = '';
      let tempState = '';

      place.address_components.forEach((component) => {
        const types = component.types;
        if (types.includes('street_number')) {
          tempStreet = component.long_name + ' ';
        }
        if (types.includes('route')) {
          tempStreet += component.long_name;
        }
        if (types.includes('locality')) {
          tempCity = component.long_name;
        }
        if (types.includes('administrative_area_level_1')) {
          tempState = component.short_name;
        }
      });

      setStreet(tempStreet.trim());
      setCity(tempCity);
      setState(tempState);
    });
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const fullDataUrl = evt.target.result; // e.g. "data:image/jpeg;base64,...."
        // Remove the prefix:
        const pureBase64 = fullDataUrl.split(',')[1];
        setPhoto(pureBase64);
      };
      reader.readAsDataURL(file);
    }
  };

  // 3. Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for required fields
    if (!description || !street || !city || !state || !contactInfo || !petType) {
      alert('All fields must have a value!');
      return;
    }

    setIsSubmitting(true);

    try {
      const obj = {
        description,
        street,
        city,
        state,
        petType,
        timeFound: moment().format(),
        contactInfo,
        photo
      };

      // Example call to your backend
      const response = await helpers.reportFoundPet(obj);

      if (response.statusCode === 200) {
        alert('Found pet posted successfully!');
        // Optionally reset the form
        setDescription('');
        setStreet('');
        setCity('');
        setState('');
        setTimeFound('');
        setContactInfo('');
        setPhoto(null);
        setPetType('');
        navigate('/');
      } else {
        alert('Something went wrong. All fields must have a value.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Render the form
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', marginBottom:"2em" }} encType="multipart/form-data">
      <h2 className='mt-3 text-center'>Report Found Pet</h2>
      
      {/* Pet Description */}
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Pet Description</label>
        {/* <input
          type="text"
          id="description"
          className="form-control"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /> */}
        <div class="form-floating">
          <textarea class="form-control" id="floatingTextarea2" style={{height:"100px"}} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
      </div>

      {/* Google Autocomplete for location */}
      <div className="mb-3">
        <label htmlFor="streetInput" className="form-label">Street You Found the Pet</label>
        <input
          type="text"
          id="streetInput"
          className="form-control"
          ref={locationRef}
          placeholder="Street, City, State"
        />
      </div>

      {/* Street */}
      <div className="mb-3">
        <label className="form-label">Street</label>
        <input
          type="text"
          className="form-control"
          readOnly
          value={street}
        />
      </div>

      {/* City */}
      <div className="mb-3">
        <label className="form-label">City</label>
        <input
          type="text"
          className="form-control"
          readOnly
          value={city}
        />
      </div>

      {/* State */}
      <div className="mb-3">
        <label className="form-label">State</label>
        <input
          type="text"
          className="form-control"
          readOnly
          value={state}
        />
      </div>

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

      {/* Upload Image (optional) */}
      <div className="mb-3">
        <label htmlFor="photo" className="form-label">Pet Photo</label>
        <input
          required
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          className="form-control"
          onChange={handlePhotoChange}
        />
      </div>

      {/* Contact Info */}
      <div className="mb-3">
        <label htmlFor="contactInfo" className="form-label">Email</label>
        <input
          type="text"
          id="contactInfo"
          className="form-control"
          required
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

export default FoundPetForm;
