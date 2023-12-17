// Middleware to authenticate user via JWT token
const JWT_SECRET = "saqibisagoodb$oy"; // Secret key used for token signing and verification
const jwt = require("jsonwebtoken"); // JSON web token library

const fetchuser = (req, res, next) => { //a middleware is a function which takes 3 arguments
  const token = req.header("auth-token"); // Retrieve token from request header(this token should be same as in the header of the getuser request method )

  // Check if token is missing
  if (!token) {
    // Respond with 401 (Unauthorized) if token is missing(user not logged in)
    return res.status(401).send({ error: "Invalid token" });
  }

  try {
    // Verify and decode the token using the secret key
    const data = jwt.verify(token, JWT_SECRET);

    // Set the decoded user data to the request object for further use in routes
    req.user = data.user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Respond with 401 if token verification fails
    res.status(401).send({ error: "Invalid token" });
  }
};

module.exports = fetchuser; // Export the middleware for use in routes
