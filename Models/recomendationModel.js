var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var recomendationModel = new Schema({
    Stock: {
        type: String
    },
    CMP: {
        type: String
    },
    target: {
        type: String
    },
    stopploss: {
        type: String
    },
    RecomendedOn: {
        type: Date
    },
    CallType: {
        type: String
    }

});

module.exports = mongoose.model('Recomendation', recomendationModel);