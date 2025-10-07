const express = require("express");
const router = express.Router();
const {
  createRecord,
  updateRecord,
  removeRecord,
  getAllRecords,
} = require("../controller/finance.controller");
const verifyToken = require('../middleware/authMiddleware');

router.post("/create", verifyToken,createRecord);
router.put("/update/:id", verifyToken, updateRecord);
router.get("/fetch", verifyToken, getAllRecords);
router.delete("/delete/:id", verifyToken, removeRecord);

module.exports = router;
