#!/usr/bin/env node

/**
 * Module dependencies.
 */

const debug = require('debug')('mean-app:server');
const http = require('http');
const socket = require('socket.io');
const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


/**
 * Get port from environment and store in Express.
 */
const
  port = process.env.PORT || 3000,
  ip = process.env.IP || '0.0.0.0';

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

app.set('port', normalizePort(port));
app.set('host', ip);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Create Socket server.
 */
const io = socket(server);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Setting up routes
 */

 // Api
app.use('/api/v1/users', require('./server/user/users.route').users(io));
app.use('/api/v1/chats', require('./server/chat/chat.route').chats(io));
app.use('/api/v1/hrx', require('./server/hrx/hrx.route').hrx(io));



// Client
app.use(function (req, res) {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// resources
app.use(express.static(path.join(__dirname, '../dist')));

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports = server;
