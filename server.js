'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.disable('x-powered-by');

const morgan = require('morgan');

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.use(morgan('short'));
    break;

  default:
}

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app/photos')));
app.use("/api/samples", express.static(path.join(__dirname, 'app/assets'))); // maybe this one would be a good location for the photo

// That code is being transpiled by brunch the stuff in the public folder
// Gotcha, it's not in the repo. I'll add a new route then
// CRSF protection
app.use('/api', (req, res, next) => {
  if (/json/.test(req.get('Accept'))) {
    return next();
  }

  res.sendStatus(406);
});

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(cookieParser());

const beets = require('./routes/beets');
const users = require('./routes/users');
const token = require('./routes/token');
const beetsUsers = require('./routes/beets_users');

app.use('/api', beets);
app.use('/api', users);
app.use('/api', token);
app.use('/api', beetsUsers);

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.sendStatus(500);
});

// socket.io stuff
const usernames = {};

io.sockets.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('enter studio', function(data) {
    console.log('enter studio', data);
    const { username, studio } = data;
    if (usernames[studio]) {
      if (usernames[studio].indexOf(username) === -1) {
        usernames[studio].push(username);
      }
    }
    else {
      usernames[studio] = [username];
    }

    socket.join(studio);
    console.log(usernames[studio]);
    io.sockets.in(studio).emit('success', { usernames: usernames[studio], studio });
  });

  socket.on('chat message', (data) => {
    console.log('chat received', data);
    io.sockets.in(data.studio).emit('post message', data);
  });

  socket.on('sync', (data) => {
    console.log('sync', data);
    io.sockets.in(data.studio).emit('sync', data);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log('Listening on port', port);
});
