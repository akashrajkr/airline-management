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
/* GET home page. */
router.get('/', function (req, res) {
    res.render('pnr', {title: 'PNR Status Enquiry'})
});

router.post('/search', (req,res)=> {
    console.log("inside search")
    console.log(req.body);
    var id = parseInt(req.body.transid);
    var sql =  `select * from passenger p, transaction t,schedule f,route r,aircraft a where f.aircraft_id=a.aircraft_id and p.passenger_id=t.passenger_id and f.route_id=r.route_id and t.flight_id=f.schedule_id and t.trans_id = ${id}`;
    con.query(sql, (err, result) => {
        if(err) throw err;
        //console.log(result[0]);
        res.send(result[0]);
    })
})

module.exports = router;