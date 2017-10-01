var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var productModel = new Schema({
    skuid: {
        type: String
    },
    name: {
        type: String
    },
    category: {
        type: String
    }

});

module.exports = mongoose.model('Product', productModel);