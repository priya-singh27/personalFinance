const {pool} = require('../db_config');
const { finance_schema } = require("../schema/finance/create");

async function getAllRecords(req, res) {
  try {
    const userId = req.userId;

    const [records] = await pool.query(
      "SELECT * FROM financial_records  WHERE user_id=?",
      [userId]
    );

    if (records.length === 0) {
      return res
        .status(404)
        .json({ error: "Record not found or unauthorized" });
    }

    return res.status(200).json({
      message: "Record fetched successfully",
      data: records,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
}

async function removeRecord(req, res) {
  try {
    const userId = req.userId;
    const recordId = req.params.id;

    const { error } = finance_schema.validate(req.body);
    if (error) {
      console.log("validation failed");
      return res.status(400).send("Invalid Data");
    }

    const [records] = await pool.query(
      "DELETE FROM financial_records  WHERE id=? AND user_id=?",
      [
        recordId,
        userId,
      ]
    );

    if (records.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Record not found or unauthorized" });
    }

    return res.status(201).json({
      message: "Record deleted successfully",
      id: recordId,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
}
async function updateRecord(req, res) {
  try {
    const userId = req.userId;
    const recordId = req.params.id;
    
    const { error } = finance_schema.validate(req.body);
    if (error) {
      console.log("validation failed");
      return res.status(400).send("Invalid Data");
    }

    const { title, amount, type, category, date, description } = req.body;

    const record = await pool.query(
      "UPDATE financial_records SET user_id=?, title=?, amount=?, type=?, category=?, date=?, description=? WHERE id=? AND user_id=?",
      [userId, title, amount, type, category, date, description || null, recordId, userId]
    );

    if (record.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Record not found or unauthorized" });
    }

    return res.status(201).json({
      message: "Record updated successfully",
      id: record.insertId,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
}

async function createRecord(req,res){
    try{
        const userId = req.userId;
        const { error } = finance_schema.validate(req.body);
        if (error) {
          console.log("validation failed");
          return res.status(400).send("Invalid Data");
        }

        const [users] = await pool.query("SELECT * FROM users WHERE id=?", [userId]);

        if(users.length===0){
            return res.status(404).send("User doesn't exist");
        }

        const { title, amount, type, category, date, description} = req.body;

        const record = await pool.query(
          "INSERT INTO financial_records (user_id, title, amount, type, category, date, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [userId, title, amount, type, category, date, description||null]
        );

        return res.status(201).json({
          message: "Record created successfully",
          id: record.insertId,
        });
    }catch(err){
        console.log(err);
        return res.status(500).send("Something went wrong");
    }
}

module.exports = {
  createRecord,
  updateRecord,
  removeRecord,
  getAllRecords,
};