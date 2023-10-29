const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 8000;


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
require('./config/mongoose.config')
mongoose.connect('mongodb://localhost/game_harmony', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Routes TBD
// require('./routes/')(app);

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
