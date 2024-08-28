var express = require('express');
var router = express.Router();
var pool = require('./pool');
const moment = require('moment-timezone');

router.post('/fetchslots',function(req, res, next){
  pool.query("select * from bookslots where doctorId=?",[req.body.doctorId],function(error,result){
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

router.post('/fetchslotsbyid',function(req, res, next){
  pool.query("select * from bookslots where slotId=?",[req.body.slotId],function(error,result){
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
    pool.query("insert into bookslots (firstName,lastName,address,mobileno,bookDate,timeSlot,description,doctorId,hexcode) values(?,?,?,?,?,?,?,?,?)",[req.body.firstName,req.body.lastName,req.body.address,req.body.mobileno,req.body.bookDate,req.body.timeSlot,req.body.description,req.body.doctorId,req.body.hexcode],function(error,result){
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

router.post('/fetchslotsbyhexcode',function(req, res, next){
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  //moment(slot.bookDate).tz('Asia/Kolkata')

  pool.query("select * from bookslots where hexcode=? AND bookDate >= ? AND emailId=?",[req.body.hexcode,moment(today).tz('Asia/Kolkata').format('YYYY-MM-DD'),req.body.emailId],function(error,result){
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

router.post('/editslot', function(req, res, next) {
  // Validate user input (e.g., ensure password meets complexity requirements)
  // ... (validation logic)

  const updateFields = [];  // Array to store fields to update
  const updateValues = [];  // Array to store corresponding values

  for (const property in req.body) {
      if (property !== 'slotId') { // Exclude emailId from update
        updateFields.push(property);
        updateValues.push(req.body[property]);
      }
  }
  // ... (similar logic for other fields)

  if (updateFields.length > 0) {
      console.log(req.body)
    const queryString = `update bookslots set ${updateFields.join('= ?, ')} =? where slotId=?`;
    pool.query(queryString, [...updateValues, req.body.slotId], function(error, result) {
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

router.post('/deleteslotsbyslotId', function(req, res, next) {
  console.log("BODY:", req.body);
  pool.query("delete from bookslots where slotId=?",[req.body.slotId],function(error,result){
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


// const Razorpay = require('razorpay');

// router.post('/createorder', function(req, res, next) {
//   // Create a new instance of Razorpay
//   const razorpay = new Razorpay({
//     key_id: 'rzp_test_Neae9UjnUWMjY0',
//     key_secret: 'jKPOe2aSv7gNid3QeOJp1mmM'
//   });

//   // Create an order
//   const options = {
//     amount: 500, // amount in paise
//     currency: 'INR',
//     receipt: 'rcptid_11',
//     payment_capture: 1
//   };

//   razorpay.orders.create(options, (err, order) => {
//     if (err) {
//       res.status(500).json({ result: false, error: err });
//     } else {
//       res.status(200).json({ result: true, order_id: order.id });
//     }
//   });
// });





module.exports = router;
