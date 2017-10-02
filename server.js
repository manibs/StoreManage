var express = require("express");
var app = express();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

// Body parser middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

var db = mongoose.connect('mongodb://localhost:27001/medicineAPI');

app.set('port', (process.env.PORT || 5000));

app.set('src', (process.env.PARSE_MOUNT || './'));

app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + "/Pages/" + "index.html");
})


var Products = require(app.get('src') + 'Models/productModel');
var productRouter = require(app.get('src') + 'Services/Products')(Products);
app.use('/api', productRouter);


var Orders = require(app.get('src') + 'Models/orderModel');
var orderRouter = require(app.get('src') +'Services/Orders')(Orders);
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
var server = app.listen(app.get('port'), function () {
    var port = server.address().port;
    console.log("App is running on port", port);
});


app.get('/', function (req, res) {
    res.send('welcome to my API!');
});


