require('dotenv').config({ path: 'variables.env' });

const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

//TODO : Use express middleware for handling cookies using JWT auth
//TODO : Use express middleware to populate current user

server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,

    },

}, serve => {
    console.log(`Server is running successfully on 
     _____________________________________________
    |                                             |
    |        http://localhost:${serve.port}                |
    |_____________________________________________|
  `)
})