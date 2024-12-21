// Spinner.js
import React from 'react';
import '../css/spinner.css'; // Import the CSS for the spinner

function Spinner() {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
}

export default Spinner;
