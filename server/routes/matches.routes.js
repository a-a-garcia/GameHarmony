const MatchesController = require('../controllers/matches.controller');

module.exports = function(app) {
    app.get('/api/matches', MatchesController.getAllMatches);
    app.get('/api/matches/:id', MatchesController.getOneMatch);
    app.post('/api/matches/new', MatchesController.createMatch);
    app.delete('/api/matches/delete/:id', MatchesController.deleteMatch);
    app.put('/api/matches/note/:id', MatchesController.addOrEditMatchNote);
}