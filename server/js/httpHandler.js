const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const keypressHandler = require('./keypressHandler');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'GET') {
    var possibleValue = ['up','down','left','right']

    //console.log(possibleValue[Math.floor(Math.random()*possibleValue.length)]);
    res.writeHead(200, headers)
    var result = 'whatever'
    keypressHandler.initialize(message => {result = message; console.log(message)});
    //console.log(result);
    res.end(result);
    next();

  } else if (req.method === 'OPTIONS') {
  res.writeHead(200, headers);
  res.end();
  next();
  }
   // invoke next() at the end of a request to help with testing!
};
