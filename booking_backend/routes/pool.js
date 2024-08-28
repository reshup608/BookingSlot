var mysql=require("mysql")

var pool=mysql.createConnection({
    host:'byteodzk3mabzhgwx5ue-mysql.services.clever-cloud.com',
    port:3306,
    user:'uryv2wrfmz1risky',
    password:'g3BvdzTQ9t34HR3agbYa',
    database:'byteodzk3mabzhgwx5ue',
    connectionLimit:100,
    multipleStatements:true});

    pool.connect(function (err) {
        if (err) {
            console.log('Error connecting to Database',err);
            return;
        }
        console.log('Connection established');
    });

module.exports = pool;