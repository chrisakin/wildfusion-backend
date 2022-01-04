const express = require('express');
const morgan = require('morgan');
const cors = require('cors');                  
const port = process.env.PORT || 8080;
const app = express(); 
require("./config/db");

//express application using required packages 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.get("/", (req, res) => res.json({message: "Welcome to Wild Fusion"}));
// api endpoint routes
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');

//express application using Routes from this application
app.use('/api/auth', userRoutes);
app.use('/api/event', eventRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
}); 

module.exports = app;