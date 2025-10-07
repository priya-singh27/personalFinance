const Joi = require("joi");

const CATEGORIES = {
  INCOME: "income",
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

const finance_schema = Joi.object({
  title: Joi.string().min(2).max(100).required().trim(),
  amount: Joi.number().precision(2).min(0.01).required(), 
  type: Joi.string().valid("income", "expense").required(), 
  category: Joi.string().valid(...Object.values(CATEGORIES)).required(),
  date: Joi.date().max("now").required(),
  description: Joi.string().max(500).optional().allow("").trim(),
});

module.exports = {
  finance_schema,
  CATEGORIES,
};
