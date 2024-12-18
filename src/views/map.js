import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NeighborhoodMap({ neighborhoodName }) {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  
  const apiKey = 'AIzaSyDGOaU4mr87R31882irdrvpJdm6TlWuw4I';

  useEffect(() => {
    async function fetchCoordinates() {
      try {
        // Geocode the neighborhood name into LAT/LNG coordinates
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            address: neighborhoodName,
            key: apiKey
          }
        });
        
        const results = response.data.results;
        if (results && results.length > 0) {
          const location = results[0].geometry.location;
          setCoords(location); // { lat: number, lng: number }
        } else {
          setError('No results found for the given neighborhood.');
        }
      } catch (err) {
        setError(err.message);
      }
    }

    if (neighborhoodName) {
      fetchCoordinates();
    }
  }, [neighborhoodName, apiKey]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!coords) {
    return <div>Loading map...</div>;
  }

  // Once we have LAT/LNG, use the Maps Embed API. We'll use `view` mode for a generic map.
  // You can adjust zoom level as desired, e.g., &zoom=14
  const mapsEmbedUrl = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${coords.lat},${coords.lng}&zoom=20`;

  return (
    <div style={{ width: '100%', height: '430px' }}>
      <iframe
        width="100%"
        height="300px"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={mapsEmbedUrl}
        title="Neighborhood Map"
      ></iframe>
    </div>
  );
}

export default NeighborhoodMap;
