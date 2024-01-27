const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const pg = require('pg');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

console.log("connecting to aivens....");

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    
    ssl: {
        rejectUnauthorized: false,
        ca: process.env.DB_SSL_CERT,
    },
};

const client = new pg.Client(config);

app.get('/mc', (req, res) => {
    client.connect(function (err) {
        if (err) {
            console.error('Error connecting to the database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        client.query("SELECT * from user_data;", [], function (err, result) {
            if (err) {
                console.error('Error querying the database:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            console.log(result.rows);
            res.json(result.rows);

            client.end(function (err) {
                if (err) {
                    console.error('Error ending the database connection:', err);
                }
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
