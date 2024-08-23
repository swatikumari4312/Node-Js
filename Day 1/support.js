const server = require('./server.js');
var _ = require('lodash');


var age = server.age;

var result = server.add(age+10,3);

console.log(result);