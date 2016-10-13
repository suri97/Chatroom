/**
 * Created by suransh on 11/10/16.
 */

const mysql = require('mysql');

var getConnection = function () {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'newuser',
        password: 'newpassword',
        database: 'newdatabase'
    });
    connection.connect();

    return connection;
};

module.exports = {
    show : (cb) => {
        let connection = getConnection();
        connection.query('SELECT * FROM chat', (err,rows,fields) => {
            cb(rows);
        })
        connection.end();
    },
    add : (data , cb) => {
        let connection = getConnection();
        var query = 'INSERT INTO chat(msg) VALUES("' + data + '")';
        console.log(query);
        connection.query(query,(err,rows,fields) => {
            cb(rows);
        })
        connection.end();
    }
};
