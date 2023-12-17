import React, { useContext ,useEffect} from "react";
import noteContext from "../context/notes/notecontext";
import Noteitem from "./Noteitem";
import AddNotes from "./AddNotes";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes,getNotes} = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, [])
  
  return (
    <div className="container">
    <AddNotes/>
      <h2>Your Notes</h2>
      <div className="row">
        {notes.map((note) => (
          // Use a unique key for each Noteitem to help React identify items efficiently
          <div key={note.id} className="col-md-3 mb-3">
            <Noteitem note={note} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
