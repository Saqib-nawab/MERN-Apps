import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; //importing useNavigate hook from react-router-dom for navigation from login page to home page if valid credentials

const Signup = (props) => {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //we can also destructure this from credentials
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken); //storing an authentication token for later use in authentication
      navigate("/"); //if valid credentials then navigato to home page using useNavigate hook
      props.showAlert("Account createdsuccessfully ", "success");
    } else {
      props.showAlert("Invalid details", "danger");
    }
  };

  // Event handler for input changes
  const onChange = (e) => {
    // Update the state with the new values from the input fields
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Full Name</label>
          <input
            type="text"
            htmlFor="name"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
          />
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            htmlFor="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            htmlFor="password"
            placeholder="Password"
            onChange={onChange}
            required
            minLength={5}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Confirmed Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            htmlFor="cpassword"
            placeholder="confirm Password"
            onChange={onChange}
            required
            minLength={5}
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
