import mysql from "mysql2";

export const connection = mysql.createConnection({
    host: "database",
    port: "3306",
    user: "root",
    password: "senha123",
    database: "db_schedule",
});