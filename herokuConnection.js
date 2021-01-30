const mysql = require("mysql");
const connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
<<<<<<< HEAD
        password: "DB_pass",
=======
        password: process.env.DB_PASS,
>>>>>>> frontend
        database: "recipnowDB"
    });
};

connection.connect();
module.exports = connection;