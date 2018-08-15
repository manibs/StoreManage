const express = require("express");

var router = function (Recommendation) {

    var RecommendationRouter = express.Router();

    RecommendationRouter.route('/recommendation')
        .post(function (req, res) {
            var recommendation = new Recommendation(req.body);
            recommendation.save();
            res.status(201).send(recommendation);
        })
        .get(function (req, res) {
            var query = {};
            
            Recommendation.find(query, function (err, recommendations) {

                if (err) {
                    res.status(500).send(err);
                    console.log(err);
                }
                else {
                    res.json(recommendations);
                }
            });

        });
};

module.exports = router;