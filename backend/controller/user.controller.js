const {pool} = require('../db_config')
const register_user = require('../schema/user/register');
const login_user = require("../schema/user/login");
const bcrypt  = require('bcrypt');
require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

async function login(req, res) {
    try{
        const { error } = login_user.validate(req.body);
        if (error) {
          console.log("validation failed");
          return res.status(400).send("Invalid Data");
        }

        const { email, password } = req.body;

        const [rows, fields] = await pool.query(
          "SELECT * FROM users WHERE email=?",
          [email]
        );

        console.log(rows[0])

        if (rows.length === 0) {
          console.log(`Row: ${rows}`);
          return res.status(404).send("User doesn't exist");
        }

        const passwordMatch = await bcrypt.compare(password, rows[0].password);

        if(!passwordMatch){
            return res.status(401).json({ error: 'Authentication failed' });
        }

        console.log("JWT_SECRET_KEY during login:", JWT_SECRET_KEY);
        const token = jwt.sign({ userId: rows[0].id }, JWT_SECRET_KEY, {
          expiresIn: "1h",
        });

        res.status(200).json({ token });

    }catch(err){
        console.log(err);
        return res.status(500).send("Something went wrong");
    }
}

async function register(req, res){
    try{

        const {error} = register_user.validate(req.body);
        if(error){
            console.log('validation failed');
            return res.status(400).send("Invalid Data");;
        }
        const {username, email, password} = req.body;

        console.log(`email: ${email}`);

        const [rows, fields] = await pool.query(
            'SELECT * FROM users WHERE email=?',[email]
        );

        if(rows.length>0) {
            console.log(`Row: ${rows}`);
            return res.status(404).send("User already exists");
        }

        const hashed_password = await bcrypt.hash(password, 10);

        await pool.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',[username, email, hashed_password]
        );

        return res.status(201).send('User registered');

    }catch(err){
        console.log(err);
        return res.status(500).send("Something went wrong");
    }
}

module.exports = {
    register,
    login
}