var express = require('express');
var router = express.Router();
var pool = require('./pool');


router.post('/insertdata', function (req, res, next) {
    pool.query("insert into user (firstName,lastName,emailId,password) values(?,?,?,?)", [req.body.firstName, req.body.lastName, req.body.emailId, req.body.password], function (error, result) {
        console.log(error);
        if (error) {
            console.log(error)
            res.status(500).json({ result: false })
        }
        else {
            res.status(200).json({ result: true })
        }
    })
})

router.post('/fetchfirstname', function (req, res, next) {
    pool.query("select firstName from user where emailId=?", [req.body.emailId], function (error, result) {
        if (error) {
            res.status(500).json([])
        }
        else {
            res.status(200).json({ data: result })
        }
    })
})

router.post('/checkuserlogin', function (req, res, next) {
    pool.query("select * from user where emailId=? and password=?", [req.body.emailId, req.body.password], function (err, result) {
        if (err) {
            res.status(500).json([])
        }
        else {
            if (result.length == 1) {
                res.status(200).json({ result: true, data: result })
            }
            else {
                res.status(200).json({ result: false })
            }
        }
    })
});

router.post('/checkhexcode', function (req, res, next) {
    pool.query("select * from admin1 where hexcode=?", [req.body.hexcode], function (err, result) {
        if (err) {
            res.status(500).json([])
        }
        else {
            if (result.length == 1) {
                res.status(200).json({ result: true, data: result })
            }
            else {
                res.status(200).json({ result: false })
            }
        }
    })
});

router.post('/checkemailid', function (req, res, next) {
    pool.query("select * from user where emailId=?", [req.body.emailId], function (err, result) {
        console.log(err);
        if (err) {
            res.status(500).json([])
        }
        else {
            if (result.length == 1) {
                res.status(200).json({ result: true, data: result })
            }
            else {
                res.status(200).json({ result: false })
            }
        }
    })
});

router.post('/editpassword', function (req, res, next) {
    pool.query("update user set password=? where emailId=?", [req.body.password, req.body.emailId], function (error, result) {
        if (error) {
            res.status(500).json(false);
        }
        else {
            res.status(200).json(true);
        }
    })
})

module.exports = router;