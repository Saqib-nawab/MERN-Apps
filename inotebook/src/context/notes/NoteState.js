import NoteContext from "./notecontext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"; //defining a host for performance optimization
  const [notes, setnotes] = useState([]); //initially set notes is empty but because  we are fetching from server later

  //fetching notes from server
  const getNotes = async () => {
    //fetching API
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      //host is defined above
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json", //these headers are from the backend server
        "auth-token": localStorage.getItem("token"),
        //this the token of the user whose notes we are fetching from the server
      },
    });
    const json = await response.json();
    setnotes(json); //setting notes to the notes fectched from the server
  };

  //adding a note
  const addNote = async (title, description, tag) => {
    //fetching API
    const response = await fetch(`${host}/api/notes/addnote`, {
      //host is defined above
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);

    const newNote = {
      _id: "some-unique-id", // Replace with a unique identifier
      user: "657574623dd9bb278619a7c8",
      title: title,
      description: description,
      tag: tag,
      __v: 0,
    };

    setnotes((notes) => [...notes, newNote]); //this is concating the newNote to the already existing notes
  };

  // deleteNote
  const deleteNote = async (id) => {
    //fetching API
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      //host is defined above
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json", //these headers are from the backend server
        "auth-token": localStorage.getItem("token"),
        //this the token of the user whose notes we are fetching from the server
      },
    });
    const json = response.json();
    console.log(`${json}delete note with id: ` + id);
    // Update the state to remove the note with the given id
    setnotes(notes.filter((note) => note._id !== id));
  };

  // editnote
  const editNote = async (id, title, description, tag) => {
    //fetching API
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      //host is defined above and id of the note will be recieved when the user clicks on the specified note
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        //editing the notes of the specified user
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json); // parses JSON response into native JavaScript objects
    console.log(id, title, description, tag);
    //editing note logic to edit at client side
    let newNote = JSON.parse(JSON.stringify(notes));
    // becuase in react we cannot edit already created note so we have to create new note for it
    for (let index = 0; index < notes.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        //if the id is matched to the note whoch is clicked to edit then set the following values
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setnotes(newNote);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
