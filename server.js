const express = require('express');
const resultRouter = require('./server/routes/router');
const app = express();
const dotenv = require('dotenv');
var path = require('path');
const connectDB = require('./server/database/connection');

dotenv.config( { path : 'config.env'} )

//set view engine
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('view engine','ejs');

//mongoDb connection
connectDB();

//load assets
app.use('/assests',express.static("assests"));

//load routes
app.use('/',require('./server/routes/router'));

app.listen(3000);