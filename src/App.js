// Import necessary dependencies and styles
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import React, { useState } from "react";

// Main App component
function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      {/* Wrap the entire application with NoteState to provide context */}
      <NoteState>
        {/* Set up the application routing using BrowserRouter */}
        <BrowserRouter>
          {/* Include the navigation bar in the app */}
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            {/* Define routes using the Routes and Route components */}
            <Routes>
              {/* Define the Home route */}
              <Route path="/" element={<Home showAlert={showAlert} />} />
              {/*usuallly e would be doing this via conetxt API but since it isnt that complex which is why we are doing it via props */}
              {/*sending showAlert as a props*/}
              {/* Define the About route */}
              <Route path="/about" element={<About />} />{" "}
              {/*sending showAlert as a prop*/}
              <Route
                path="/login"
                element={<Login showAlert={showAlert} />}
              />{" "}
              {/*sending showAlert as a prop*/}
              <Route
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

// Export the App component as the default export
export default App;
