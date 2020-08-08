var express = require('express');
var router = express.Router();
let con = require('./mysqlConnect');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var sent = false;
router.use(bodyParser.json());
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {user : 'akkayyaairlines@gmail.com',
      pass: 'airlineniggas'
    }
  });

  router.get('/', function (req, res) {
    var transid = req.body.transid;
    //var sql = "select * from aircraft a, flight_schedule f, route r where a.id = f.aircraft and f.route=r.id and r.airport = ? and r.destination = ? and f.date=? and f.flightid=?";
    //con.query(sql, [from, to, date, flight], function (err, result) {
       // if (err) throw err;
        //console.log(result[0]);
        res.render('cancel', { title: 'Cancel ticket'});
    //})
});
router.post('/search', (req,res)=> {
  var id = req.body.transid;
  var sql =  `select * from passenger p, transaction t,schedule f,route r,aircraft a where f.aircraft_id=a.aircraft_id and p.passenger_id=t.passenger_id and f.route_id=r.route_id and t.flight_id=f.schedule_id and t.trans_id = ${id}`;
  con.query(sql, (err, result) => {
      if(err) throw err;
      //console.log(result[0]);
      res.send(result[0]);
  })
})
router.get('/confirm',(req,res)=>{
  var id = req.query.id;
  var sql = `delete from transaction where trans_id = ?`
  con.query(sql,id,(err,result)=>{
    if(err) throw err;
    console.log("Success!!" + result)
    res.send(result)
  })
})

module.exports=router;