var express = require('express');
var router = express.Router();
var pool = require('./pool');


router.post('/fetchdoctorbyemail',function(req, res, next){
    pool.query("select * from doctor where emailId=?",[req.body.emailId],function(error,result){
        if(error)
            {
              res.status(500).json([])
            }
        else
            {
              res.status(200).json({data:result})
            }
    })
})

router.post('/fetchdoctorbyid',function(req, res, next){
    pool.query("select * from doctor where doctorId=?",[req.body.doctorId],function(error,result){
        if(error)
            {
              res.status(500).json([])
            }
        else
            {
              res.status(200).json({data:result})
            }
    })
})


router.post('/insertdata',function(req,res,next){
    pool.query("insert into doctor (doctorName,doctorType,shift,startTime,endTime,duration,emailId) values(?,?,?,?,?,?,?)",[req.body.doctorName,req.body.doctorType,req.body.shift,req.body.startTime,req.body.endTime,req.body.duration,req.body.emailId],function(error,result){
        console.log(error);
        if(error)
            {
              console.log(error)
              res.status(500).json({result:false})
            }
        else
            {
              res.status(200).json({result:true})
            }
    })
})

router.post('/editdoctor', function(req, res, next) {
    // Validate user input (e.g., ensure password meets complexity requirements)
    // ... (validation logic)
  
    const updateFields = [];  // Array to store fields to update
    const updateValues = [];  // Array to store corresponding values
  
    for (const property in req.body) {
        if (property !== 'doctorId') { // Exclude emailId from update
          updateFields.push(property);
          updateValues.push(req.body[property]);
        }
    }
    // ... (similar logic for other fields)
  
    if (updateFields.length > 0) {
        console.log(req.body)
      const queryString = `update doctor set ${updateFields.join('= ?, ')} =? where doctorId=?`;
      pool.query(queryString, [...updateValues, req.body.doctorId], function(error, result) {
        console.log(error);
        if (error) {
          res.status(500).json(false);
        } else {
          res.status(200).json(true);
        }
      });
    } else {
      // Handle case where no fields are provided for update
      res.status(400).json({ message: 'No fields provided for update' });
    }
});

router.post('/deletedoctor', function(req, res, next) {
    console.log("BODY:", req.body);
    pool.query("delete from doctor where doctorId=?",[req.body.doctorId],function(error,result){
      console.log(error)
        if(error)
        {
          res.status(500).json(false)
        }
        else
        {
          res.status(200).json(true)
        }
      })
});

router.post('/fetchdoctornamebyid',function(req, res, next){
  pool.query("select doctorName from doctor where doctorId=?",[req.body.doctorId],function(error,result){
      if(error)
          {
            res.status(500).json([])
          }
      else
          {
            res.status(200).json({data:result})
          }
  })
})


module.exports = router;