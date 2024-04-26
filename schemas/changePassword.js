const Joi = require("joi");

const schema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{4,32}$")).required(),
});

module.exports = schema;
