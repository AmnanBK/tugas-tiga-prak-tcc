const mysql = require('mysql2/promise');

// Setup your local database credentials here
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',      // Adjust to your local MySQL username
    password: '',      // Adjust to your local MySQL password
    database: 'notes_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
