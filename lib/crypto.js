const jwt = require("jsonwebtoken");

function generateTokenWithTime(payload, time) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: time,
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
      if (err) reject({ message: "Invalid Token", status: 400 });
      resolve(payload);
    });
  });
}

module.exports = {
  verifyToken,
  generateTokenWithTime,
};
