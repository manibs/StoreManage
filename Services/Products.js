var express = require('express');

var routes = function (Product) {
    var productRouter = express.Router();

    productRouter.route('/products')
        .post(function (req, res) {
            var products = new Product(req.body);
            products.save();
            res.status(201).send(products);
        })
        .get(function (req, res) {
            var query = {};

            if (req.query.category) {
                query.category = req.query.category;
            }

            Product.find(query, function (err, products) {

                if (err) {
                    res.status(500).send(err);
                    console.log(err);
                }
                else {
                    res.json(products);
                }
            });

        });

    productRouter.route('/Products/:id')
        .get(function (req, res) {
            Product.findById(req.params.id, function (err, products) {
                if (err) {
                    res.status(500).send(err);
                    console.log(err);
                }
                else {
                    res.status(200).json(products);
                }
            });

        });

    return productRouter;
};

module.exports = routes;    