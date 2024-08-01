const express = require('express');
const path = require('path');
const app = express();
const port = 5000; // Choose a port for the server

// Middleware to parse JSON
app.use(express.json());


app.get('/api/endpoint', (req, res) => {
  res.json({ message: 'Hello from the Node server!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;