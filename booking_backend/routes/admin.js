var express = require('express');
var router = express.Router();
var pool = require('./pool');
const crypto = require('crypto');

router.get('/fetchadmin',function(req, res, next){
    pool.query("select * from admin1",function(error,result){
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


router.post('/fetchadminbyemail',function(req, res, next){
    pool.query("select * from admin1 where emailId=?",[req.body.emailId],function(error,result){
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


router.post('/fetchadminbyhexcode',function(req, res, next){
  pool.query("select * from admin1 where hexcode=?",[req.body.hexcode],function(error,result){
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


router.post('/fetchhexcode',function(req, res, next){
    pool.query("select hexcode from admin1 where emailId=?",[req.body.emailId],function(error,result){
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


router.post('/fetchemailbyhexcode',function(req, res, next){
  pool.query("select emailId from admin1 where hexcode=?",[req.body.hexcode],function(error,result){
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


router.post('/checkadminlogin', function(req, res, next) {
    pool.query("select * from admin1 where emailId=? and password=?",[req.body.emailId,req.body.password],function(err,result){
        if(err)
        {
            res.status(500).json([])
        }
        else {
            if(result.length==1)
            {
            res.status(200).json({result:true,data:result})
            }
            else
            {
              res.status(200).json({result:false})
            }
        }
    })
});

router.post('/checkemailid', function(req,res,next){
    pool.query("select * from admin1 where emailId=?",[req.body.emailId],function(err,result){
      console.log(err);
      if(err)
        {
            res.status(500).json([])
        }
        else {
            if(result.length==1)
            {
            res.status(200).json({result:true,data:result})
            }
            else{
              res.status(200).json({result:false})
            }
        }
    })
});


router.post('/editpassword',function(req,res,next){
    pool.query("update admin1 set password=? where emailId=?",[req.body.password,req.body.emailId],function(error,result){
      if(error){
        res.status(500).json(false);
      }
      else{
        res.status(200).json(true);
      }
    })
  })
  

router.post('/editadmin', function(req, res, next) {
    // Validate user input (e.g., ensure password meets complexity requirements)
    // ... (validation logic)
  
    const updateFields = [];  // Array to store fields to update
    const updateValues = [];


    for (const property in req.body) {
        if (property !== 'emailId') { // Exclude emailId from update
          updateFields.push(property);
          updateValues.push(req.body[property]);
        }
      }

   
    if (updateFields.length > 0) {
      const queryString = `update admin1 set ${updateFields.join('= ?, ')} =? where emailId=?`;
      console.log(queryString);
      pool.query(queryString, [...updateValues, req.body.emailId], function(error, result) {
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
  

router.post('/insertdata',function(req,res,next){
    const uniqueCode = generateUniqueCode();
    console.log(req.body);
    pool.query("insert into admin1 (firstName,lastName,emailId,hospitalName,address,city,postal,password,hexcode) values(?,?,?,?,?,?,?,?,?)",[req.body.firstName,req.body.lastName,req.body.emailId,req.body.hospitalName,req.body.address,req.body.city,req.body.postal,req.body.password,uniqueCode],function(error,result){
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
});

router.post('/deleteadmin', function(req, res, next) {
    console.log("BODY:", req.body);
    pool.query("delete from admin1 where emailId=?",[req.body.emailId],function(error,result){
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


function generateUniqueCode() {
  // Generate 6 bytes of random data (ensures at least 48 bits for 8 digits)
  const randomBytes = crypto.randomBytes(6);

  // Convert the random bytes to a hex string and truncate to 8 digits
  const code = randomBytes.toString('hex').slice(0, 8);

  // Optionally, check for uniqueness in your database
  // (implementation depends on your database setup)

  return code;
}





module.exports = router;