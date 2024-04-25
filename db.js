const mongoose = require('mongoose');

module.exports = async function connect() {
// TODO - Environment Variable
  await mongoose.connect('mongodb://webapp:palmmind@127.0.0.1:27017/palmmind');
}