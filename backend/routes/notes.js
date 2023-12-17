const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser"); //importing middleware of fetchuser
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator"); // Importing express-validator for input validation

//Route 1: fetching all the notes at "/api/auth/fetchallnotes" : login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
      const notes = await Notes.find({ user: req.user.id });
      res.json(notes);
    } catch (error) {
      console.error(error); // Log the specific error for debugging purposes
      res.status(500).json({ error: "Failed to fetch notes" }); // Sends a more descriptive error response
    }
  });

//Route 2: adding notes at "/api/auth/addnote" : login required
router.post(
  "/addnote",
  fetchuser,  //fetching the fetchuser middleware in order to get the already alogged in user id whose is trying to post the note
  [
    body("title").isLength({ min: 3 }).withMessage("Enter valid title"), // Validates title length
    body("description").isLength({ min: 5 }).withMessage("Enter complete name"), // Validates description length
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body; //destructuring these from user provided by fetchuser middleware
      const errors = validationResult(req); // Collects validation errors
      if (!errors.isEmpty()) {
        // If there are validation errors, returns a 400 status with error details in JSON
        return res.status(400).json({ errors: errors.array() });
      }
      //creating a new note based on the Notes.js model imported
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id //user: req.user.id is assigning the id of the logged-in user (req.user.id) to the user field of the newly created note.
      });
      const savedNote = await note.save();
      res.json(savedNote);

    } catch (error) {
        console.error(error); // Log the specific error for debugging purposes
      res.status(500).json({ error: "something went wrong" }); // Sends a generic error response
    }
  }
);

//Route 3: updting a note of some specific id at "/api/auth/updatenote:id" using put : login required

router.put(
  "/updatenote/:id",
  fetchuser,  //fetching the fetchuser middleware in order to get the already alogged in user id whose is trying to post the note
  async (req, res) => {
    try {
      const { title, description, tag } = req.body; //destructuring these from user provided by fetchuser middleware
      const errors = validationResult(req); // Collects validation errors
      if (!errors.isEmpty()) {
        // If there are validation errors, returns a 400 status with error details in JSON
        return res.status(400).json({ errors: errors.array() });
      }
      //creating a new note object
      const newNote = {};
      if(title){newNote.title=title};// if title exist then update it to the new title
      if(description){newNote.description=description};// if description exist then update it to the new description
      if(tag){newNote.tag=tag};// if tag exist then update it to the new tag
      
      //now find the note to be updated and update it
      let note= await Notes.findById(req.params.id)// here we are trying to find the note id from all the notes
      if(!note){return res.status(404).send("note not found");} //incase note does not exist

      //here we are ensuring that someone else shouldnt be allowed to update any other notes
      if(note.user.toString() !== req.user.id){
        return res.status(401).send("You are not allowed to modidy this note");
      }
      //finally updating the note of specific id
      note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
      res.json({note});//findByIdAndUpdate efficiently finds and updates a note based on its ID and the provided update data (newNote). 

    } catch (error) {
        console.error(error); // Log the specific error for debugging purposes
      res.status(500).json({ error: "something went wrong" }); // Sends a generic error response
    }
  }
);

//Route 4: delete a note of some specific id at "/api/auth/delete:id" using delete : login required

router.delete(
  "/delete/:id",
  fetchuser,  //fetching the fetchuser middleware in order to get the already alogged in user id whose is trying to post the note
  async (req, res) => {
    try {
      const { title, description, tag } = req.body; //destructuring these from user provided by fetchuser middleware
      const errors = validationResult(req); // Collects validation errors
      if (!errors.isEmpty()) {
        // If there are validation errors, returns a 400 status with error details in JSON
        return res.status(400).json({ errors: errors.array() });
      }
      
      //now find the note to be deleted and delete it
      let note= await Notes.findById(req.params.id)// here we are trying to find the note id from all the notes
      if(!note){return res.status(404).send("note not found");} //incase note does not exist

      //here we are ensuring that someone else shouldnt be allowed to delete any other notes
      if(note.user.toString() !== req.user.id){
        return res.status(401).send("You are not allowed to delete this note");
      }
      //finally updating the note of specific id
      note = await Notes.findByIdAndDelete(req.params.id);
      res.json({"Success":"note successfully deleted"});
    } catch (error) {
        console.error(error); // Log the specific error for debugging purposes
      res.status(500).json({ error: "something went wrong" }); // Sends a generic error response
    }
  }
);
module.exports = router;
