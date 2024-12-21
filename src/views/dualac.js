// DualAddressComponent.js
import React, { useEffect, useRef, useState } from 'react';

function DualAddressComponent({ onAddressChange, petsname }) {
  const rpmAddressRef = useRef(null);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  useEffect(() => {
    if (!rpmAddressRef.current || !window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(rpmAddressRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'us' },
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.address_components) return;

      let tempStreet = "";
      let tempCity = "";
      let tempState = "";

      place.address_components.forEach(component => {
        const types = component.types;
        if (types.includes('street_number')) {
          tempStreet += component.long_name + ' ';
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

      const formattedAddress = `${tempStreet.trim()}, ${tempCity}, ${tempState}`.trim();

      setStreet(tempStreet.trim());
      setCity(tempCity);
      setState(tempState);
      setFullAddress(formattedAddress);

      // Optionally, pass the address up to the parent component
      if (onAddressChange) {
        onAddressChange({
          street: tempStreet.trim(),
          city: tempCity,
          state: tempState,
          address: formattedAddress,
        });
      }
    });
  }, [onAddressChange]);

  return (
    <div className='text-left'>
      <input
        type="text"
        id="RPMAddress"
        ref={rpmAddressRef}
        value={fullAddress}
        onChange={(e) => setFullAddress(e.target.value)}
        className="form-control"
        placeholder={`What street did you see ${petsname}?`}
      />
      <span style={{fontSize:"10px"}}>*An email will be sent to the owner with this update.</span>
    </div>
  );
}

export default DualAddressComponent;

