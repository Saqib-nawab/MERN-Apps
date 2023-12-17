// Import necessary dependencies and styles
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

// Main App component
function App() {
  return (
    <>
      {/* Wrap the entire application with NoteState to provide context */}
      <NoteState>
        {/* Set up the application routing using BrowserRouter */}
        <BrowserRouter>
          {/* Include the navigation bar in the app */}
          <Navbar />
          <Alert message="Changed!"/>
          <div className="container">
            
          {/* Define routes using the Routes and Route components */}
          <Routes>
            {/* Define the Home route */}
            <Route path="/" element={<Home />} />
            {/* Define the About route */}
            <Route path="/about" element={<About />} />
          </Routes>

          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

// Export the App component as the default export
export default App;
