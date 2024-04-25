const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().alphanum().min(4).max(32).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{4,32}$")).required(),
  description: Joi.string().trim().min(16).max(256).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required(),
});

module.exports = schema;
