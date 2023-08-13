const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const tournamentRoutes = require('./routes/tournamentRoutes');
const participantRoutes = require('./routes/participantRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors("http://localhost:3000"));
app.use(express.json());

// Connect to MongoDB

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error: ", err);
  });

// Routes

app.use('/api/tournaments', tournamentRoutes);
app.use('/api/participants', participantRoutes);

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});