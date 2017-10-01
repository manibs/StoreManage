var express = require("express");
var app = express();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

// Body parser middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
var db = mongoose.connect('mongodb://admin:admin@cluster0-shard-00-00-3tc1a.mongodb.net:27017,cluster0-shard-00-01-3tc1a.mongodb.net:27017,cluster0-shard-00-02-3tc1a.mongodb.net:27017/medicineAPI?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/Pages/" + "index.html" );
})

var Products = require('./models/productModel');
var productRouter = require('./Services/products')(Products);
app.use('/api', productRouter);


var Orders = require('./models/orderModel');
var orderRouter = require('./Services/orders')(Orders);
app.use('/api', orderRouter);


//CORS middleware
app.use(function (req, res, next) {
    //Enable CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-method", "GET,HEAD,OPTIONS,PUT,POST");
    res.header("Access-Control-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up a server
var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("App is running on port", port);
});


app.get('/', function (req, res) {
    res.send('welcome to my API!');
});


