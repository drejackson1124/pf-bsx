import React, { useState } from "react";
import helpers from "../js/functions";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    // Perform sign-in logic here (e.g., send data to the server)
    const result = await helpers.login({email, password, date: moment().format()});
    if(result.statusCode === 200){
        alert("You'll now be redirected to the dashboard.");
        props.setAuth(true);
        navigate('/dashboard');
    } else {
        alert("Something went wrong. Please try again.");
        console.log(result);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Welcome, log in below.</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>


        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;