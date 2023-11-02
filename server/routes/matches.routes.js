const MatchesController = require('../controllers/matches.controller');

module.exports = function(app) {
    app.get('/api/matches', MatchesController.getAllMatches);
    app.post('/api/matches/new', MatchesController.createMatch);
    app.delete('/api/matches/delete/:id', MatchesController.deleteMatch);
}