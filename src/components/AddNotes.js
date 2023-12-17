// Import necessary dependencies
import React, { useContext, useState } from "react";
import noteContext from "../context/notes/notecontext";

// Functional component for adding notes
const AddNotes = () => {
  // Accessing the note context using useContext hook
  const context = useContext(noteContext);
  // Destructuring the addNote function from the context API
  const { addNote } = context;

  // State to manage the input values for the new note
  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "Default",
  });

  // Event handler for form submission
  const handleClick = (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    // Call the addNote function with the values from the state
    addNote(note.title, note.description, note.tag);
  };

  // Event handler for input changes
  const onChange = (e) => {
    // Update the state with the new values from the input fields
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* Title for the add notes section */}
      <h2 className="my-3">Add Notes</h2>
      {/* Form for adding a new note */}
      <form>
        {/* Input field for the title */}
        <div className="form-group my-3">
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            placeholder="Enter title"
            onChange={onChange}
          />
        </div>
        {/* Input field for the description */}
        <div className="form-group my-3">
          <label htmlFor="exampleInputPassword1">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter description"
            onChange={onChange}
          />
        </div>

        {/* Input field for the tag */}
        <div className="form-group my-3">
          <label htmlFor="exampleInputPassword1">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="Enter tag"
            onChange={onChange}
          />
        </div>

        {/* Button to submit the form and add a new note */}
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

// Export the AddNotes component as the default export
export default AddNotes;
