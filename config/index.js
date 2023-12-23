const  database = require('./db.js');
const kafka = require('./kafka.js');
const payment = require('./payment.js');

module.exports = {
  database,
  kafka,
  payment,
};
