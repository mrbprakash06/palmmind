const mongoose = require("mongoose");

module.exports = async function connect() {
  await mongoose.connect(process.env.DATABASE_URL);
};
