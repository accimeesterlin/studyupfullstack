const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/studyup");

const db = mongoose.connection;

db.once("open", function () {
    console.log("Mongoose connection successful!!!");
});

db.on("error", function (err) {
    console.log("Mongoose Error: ", err);
});



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser("thisisgreat"));
app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./server_routes/routes');

app.use('/api', routes);


app.listen(3001, () => {
    console.log("App is starting at port 30001");
});
