
    var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


    var orderlineModel = new Schema({
        productId: {
            type: String
        },
        quantity: {
            type: Number
        },
        deliveryRecieved: { type: Boolean, default: false }
    });

    var orderModel = new Schema({
        orderDate: {
            type: Date
        },
        orderlines: [orderlineModel]
    });

    
    module.exports = mongoose.model('Orderline', orderlineModel);
    module.exports = mongoose.model('Order', orderModel);

 