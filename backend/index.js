const express = require('express');
const app =express();
require("dotenv").config();
const cors = require('cors');


const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

require('./db_config').checkConnection();

const user = require('./routes/user');
const finance = require('./routes/finance')

app.use('/user', user);
app.use('/manage-finance', finance)