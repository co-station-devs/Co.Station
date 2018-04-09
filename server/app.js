const cors = require('cors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Set up app
const app = express();

// Fetch url from env
let mongoURL = process.env.MONGODB_URI || process.env.MONGO_URL || 'mongodb://127.0.0.1';

// Monogo connection
mongoose.Promise = require('bluebird');
mongoose.connect(mongoURL, {useMongoClient: true, promiseLibrary: require('bluebird')})
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

// Config stuff
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// resources
app.use(express.static(path.join(__dirname, '../dist')));



module.exports = app;
