const Joi = require("joi");

const CATEGORIES = {
  FOOD: "food",
  TRANSPORTATION: "transportation",
  ENTERTAINMENT: "entertainment",
  HEALTHCARE: "healthcare",
  UTILITIES: "utilities",
  SHOPPING: "shopping",
  EDUCATION: "education",
  TRAVEL: "travel",
  OTHER: "other",
};

const expense_schema = Joi.object({
  title: Joi.string().min(2).max(100).required().trim(),
  amount: Joi.number().precision(2).min(0.01).required(),
  category: Joi.string().valid(...Object.values(CATEGORIES)).required(),
  date: Joi.date().max("now").required(),
  description: Joi.string().max(500).optional().allow("").trim(),
});

module.exports = {
  expense_schema,
  CATEGORIES,
};
