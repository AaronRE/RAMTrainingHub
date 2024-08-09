import express from "express";
import path from "path";
const app = express();
const port = 5000; // Choose a port for the server

//Import router
//const router = require('./routes/index');

// Middleware to parse JSON
app.use(express.json());

// Route for home page
//app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/public/index.html'));
//});

//login endpoint stub
app.post('/api/login', (req, res) => {
	res.sendStatus(200);
});

app.get('/api/endpoint', (req, res) => {
  res.json({ message: 'Hello from the Node server!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

export default app;
