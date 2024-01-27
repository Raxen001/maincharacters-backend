const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const pool = mysql.createPool({
  host: 'ip',
  user: 'user',
  password: 'password',
  database: 'database',
  connectionLimit: 10, 
});

app.use((req, res, next) => {
  req.mysql = pool;
  next();
});

app.get('/printall', (req, res) => {
  const sql = 'SELECT * FROM BANK';
  req.mysql.query(sql, (err, results, fields) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
