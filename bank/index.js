// Import the mysql2 library
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'ip', 
  user: 'mysql_user',
  password: 'password',
  database: 'database',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the database');
});

// Sample request: Fetch data from a table
connection.query('SELECT * FROM your_table_name', (err, results, fields) => {
  if (err) {
    console.error('Error executing query:', err.message);
    return;
  }
  console.log('Query results:', results);

  connection.end((err) => {
    if (err) {
      console.error('Error closing connection:', err.message);
    }
    console.log('Connection closed');
  });
});
