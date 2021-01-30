const mysql = require("mysql");
const connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "DB_pass",
        database: "recipnowDB"
    });
};

connection.connect();
module.exports = connection;