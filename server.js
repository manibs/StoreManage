const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
var cors = require('cors');

// Body parser middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//enable cors
app.use(cors());

// var db = mongoose.connect('mongodb://localhost:27001/medicineAPI');
//var db = mongoose.connect('mongodb://admin:P@ssw0rd12!@cluster0-shard-00-00-3tc1a.mongodb.net:27017,cluster0-shard-00-01-3tc1a.mongodb.net:27017,cluster0-shard-00-02-3tc1a.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true');
var db = mongoose.connect('mongodb://admin:Passw0rd1!@ds121282.mlab.com:21282/wealthconnect');

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


 var Recommendations = require(app.get('src') + 'Models/recommendationModel');
 var recommendationRouter = require(app.get('src') +'Services/Recommendation')(Recommendations);
 app.use('/api', recommendationRouter);

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


