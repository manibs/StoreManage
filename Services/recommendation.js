var express = require('express');

var router = function (Recommendation) {

    var RecommendationRouter = express.router;

    RecommendationRouter.route('/recommendation')
    .post(function(req, res){
        var recommendation = new Recommendation(req.body);
        recommendation.save();
        res.status(201).send(recommendation);
    })
};

module.exports = router;