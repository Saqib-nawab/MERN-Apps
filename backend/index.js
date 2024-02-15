const connectToMongo = require('./db.js');
const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

const port = process.env.PORT || 5000;

// Establish connection to MongoDB Atlas
connectToMongo();

// Sample route for the root URL
app.get('/', (req, res) => {
  res.send('Hello Saqib!');
});

// Routes for authentication and managing notes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes', require('./routes/notes.js'));

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`InoteBook app listening on port ${port}`);
});
