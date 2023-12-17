const express = require("express"); // Importing the Express framework
const router = express.Router(); // Creating an instance of an Express router
const User = require("../models/User"); // Importing the User model from a file
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator"); // Importing express-validator for input validation
const JWT_SECRET = "saqibisagoodb$oy"; // This key is used to validate your login token once you have already logged in
const jwt = require("jsonwebtoken"); // JSON web token used for authentication
const fetchuser = require("../middleware/fetchuser"); //importing middleware of fetchuser

//Route 1: Creating a POST route at "/api/auth/createuser" for user creation (login not required)
router.post(
  "/createuser",
  [
    // Express-validator middleware for input validation
    body("password").isLength({ min: 5 }).withMessage("Password not valid"), // Validates password length
    body("email").isEmail().withMessage("Not a valid e-mail address"), // Validates email format
    body("name").isLength({ min: 3 }).withMessage("Enter complete name"), // Validates name length
  ],
  async (req, res) => {
    const errors = validationResult(req); // Collects validation errors
    if (!errors.isEmpty()) {
      // If there are validation errors, returns a 400 status with error details in JSON
      return res.status(400).json({ errors: errors.array() });
    }

    // Checking if user with the same email already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ errors: "email already exists" });
      }
      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET); // Creating JWT token
      res.json({ authtoken }); // Sending the token as a response
    } catch (error) {
      console.error(error.withMessage); // Logs the error for debugging purposes
      res.status(500).json({ error: "something went wrong" }); // Sends a generic error response
    }
  }
);

// Route 2: Creating a POST route at "/api/auth/login" for user login (login not required)
router.post(
  "/login",
  [
    // Express-validator middleware for input validation
    body("password").exists().withMessage("Password not valid"), // checks whether the password is empty or not
    body("email").isEmail().withMessage("wrong credentials"), // checks if the email exists
  ],
  async (req, res) => {
    const errors = validationResult(req); // Collects validation errors
    if (!errors.isEmpty()) {
      // If there are validation errors, returns a 400 status with error details in JSON
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body; // destructuring email and password from user data
    try {
      let user = await User.findOne({ email: req.body.email }); // checks if the user with this email exists
      if (!user) {
        // if not then it returns an error
        return res.status(400).json({ errors: "wrong credentials" });
      }
      const passwordcompare = await bcrypt.compare(password, user.password); //comapring if the password is matched to the password entered by user
      if (!passwordcompare) {
        return res.status(400).json({ errors: "wrong credentials" }); //incase if password is wrong send an error message
      }
      //otherwise send user data
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET); // Creating JWT token if the same user wants to login again he will not have to login again.
      res.json({ authtoken }); // Sending the token as a response
    } catch (error) {
      console.error(error.withMessage); // Logs the error for debugging purposes
      res
        .status(500)
        .json({ error: "something went wrong in intervel server" }); // Sends a generic error response
    }
  }
);

// Route 3: Creating a Get route at "/api/auth/getuser" for getting logged in user details  (login required)

router.get(
  "/getuser",
  fetchuser, // Apply fetchuser middleware
  async (req, res) => {
    try {
      const userid = req.user.id; // Extract user ID from authenticated request object in the fetchuser middleware

      // Fetch user data from the database by ID, excluding the password field
      const user = await User.findById(userid).select("-password");

      // Respond with the retrieved user data
      res.send(user);
    } catch (error) {
      console.error(error);
      // Respond with 500 (Internal Server Error) if any error occurs
      res
        .status(500)
        .json({ error: "Something went wrong in interval server" });
    }
  }
);

module.exports = router; // Export the router for use in other parts of the application
