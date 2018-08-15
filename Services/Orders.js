const express = require("express");



var router = function (Order) {

    var orderRouter = express.Router();
    
    orderRouter.route('/orders')
    .post(function(req, res){
        var order = new Order(req.body);
        order.save();
        res.status(201).send(order);
    })
    .get(function(req, res){
        var query = {};

        Order.find(query, function(err, orders){
            if(err){
                res.status(500).send(err);
                console.log(err);
            }
            else{
                res.json(orders);
            }

        })
    })

    return orderRouter;

};

module.exports = router;
