const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/game_harmony', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Successfully connected to the gameHarmony database'))
    .catch((err) => console.log('Error connecting to the gameHarmony database', err));
