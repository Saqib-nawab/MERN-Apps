import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/notecontext";
import Noteitem from "./Noteitem";
import AddNotes from "./AddNotes";
import { useNavigate } from "react-router-dom"; //importing useNavigate hook from react-router-dom for navigation from login page to home page if valid credentials

const Notes = (props) => {
  const { showAlert } = props;
  let Navigate = useNavigate();
  const context = useContext(noteContext);
  const ref = useRef(null); //defining ref to null using useRef
  const refClose = useRef(null); //defining refClose to null using useRef in order to close the editing modal
  const { notes, getNotes, editNote } = context; //destructuring information from context
  // State to manage the input values for the new note
  const [note, setnote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
    id: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      Navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const updatenote = (currentnote) => {
    ref.current.click(); //updatenote recieved back from Noteitem.js when someone clicks on the note icon
    setnote({
      //setting up the note new information
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
      id: currentnote._id, // getting the id of the note we are editing
    }); //setting note to current note because we are updating it to the new value
  };

  // Event handler for form submission
  const handleClick = (e) => {
    ref.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    showAlert("Note updated successfully", "success");
  };

  // Event handler for input changes
  const onChange = (e) => {
    // Update the state with the new values from the input fields
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <AddNotes showAlert={props.showAlert} />
      <button
        /* this is a bootstrap5 modal */
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        tabIndex="-1"
        ref={
          ref
        } /* giving the reference of this button using useRef hook so when someone clicks on the icon in Noteitem, then this button will be trigered */
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form>
                {/* Input field for the title */}
                <div className="form-group my-3">
                  <label htmlFor="Title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    placeholder="Enter title"
                    onChange={onChange}
                    value={note.etitle} //we have given the values as such so that when someone clicks on the edit button it will trigger the updatenote function prop that we passed to Noteitem.js and it will trigger the updatenote function here where we have set the etitle,edescription and and etag values.
                  />
                </div>
                {/* Input field for the description */}
                <div className="form-group my-3">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    placeholder="Enter description"
                    onChange={onChange}
                    value={note.edescription} //we have given the values as such so that when someone clicks on the edit button it will trigger the updatenote function prop that we passed to Noteitem.js and it will trigger the updatenote function here where we have set the etitle,edescription and and etag values.
                  />
                </div>

                {/* Input field for the tag */}
                <div className="form-group my-3">
                  <label htmlFor="tag">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    placeholder="Enter tag"
                    onChange={onChange}
                    value={note.etag} //we have given the values as such so that when someone clicks on the edit button it will trigger the updatenote function prop that we passed to Noteitem.js and it will trigger the updatenote function here where we have set the etitle,edescription and and etag values.
                  />
                </div>

                {/* Button to submit the form and add a new note */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2>Your Notes</h2>
      <div className="row">
        {notes.map((note) => (
          // Use a unique key for each Noteitem to help React identify items efficiently
          <div key={note.id} className="col-md-3 mb-3">
            <Noteitem
              note={note}
              updatenote={updatenote}
              showAlert={props.showAlert}
            />
          </div>
          //with the updatenote prop we are actually updating the note when someone will click on the edit icon
        ))}
      </div>
    </div>
  );
};

export default Notes;
