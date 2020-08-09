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
    var from = req.query.from;
    var to = req.query.to;
    var date = req.query.date;
    var flight = req.query.flight;
    var sql = "select * from aircraft a, schedule f, route r where a.aircraft_id = f.aircraft_id and f.route_id = r.route_id  and r.source = ? and r.destination = ? and DATE(f.departure) = ? and f.schedule_id=?";
    con.query(sql, [from, to, date, flight], function (err, result) {
        if (err) throw err;
        console.log(result);
        console.log(result[0]);
        res.render('book', { title: 'Book ticket', result: result[0] });
    })
});

router.post('/confirm', (req, res) => {
    console.log(req.body);
    var name = req.body.name,
        email= req.body.email,
        country= req.body.country,
        seats=parseInt(req.body.seats),
        address= req.body.address,
        age=parseInt(req.body.age),
        phone= req.body.phone,
        flightid = parseInt(req.body.flightid);
        passportid = req.body.passportid;
    console.log(name,email,country,seats,address,age,phone,flightid,passportid)
    var sql = "insert into passenger (passenger_name,email,address,nationality,age,phone,passport_id) values (?,?,?,?,?,?,?)";
    var sql1 = "insert into transaction (passenger_id,flight_id,seats_booked) values (?,?,?)";
    con.query(sql,[name,email,address,country,age,phone,passportid],function (err,result){ 
        if(err) throw err;
        console.log(result);
        var passid = result.insertId;
        con.query(sql1,[passid,flightid,seats],(err,result)=>{
            if(err) throw err;
            console.log(result);
            res.send(result)
        })
    })      
})

router.get('/transdetails', (req, res)=> {
    var id = req.query.id;
    var sql =  `select * from passenger p, transaction t, schedule f,route r,aircraft a where f.aircraft_id=a.aircraft_id and p.passenger_id=t.passenger_id and f.route_id=r.route_id and t.flight_id = f.schedule_id and t.trans_id = ${id}`;
    con.query(sql,(err, result) => {
        if(err) throw err;
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        console.log('email: '+result[0].email)
       if(!sent){
           sent = !sent;
        var mailOptions = {
            from: 'akkayyaairlines@gmail.com',
            to: `${result[0].email}`,
            subject: 'Your Ticket',
            html : `

                <h2> Your transaction id: ${result[0].transid} </h2>
                <h4> Check more details in <a href="localhost:3000/pnr/?id=${result[0].transid}">our website</a></h4>
            `
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
       }
        console.log(result);
        res.render("transdetails",{title : "Booking confirmation", result : result[0] });
    })
})

module.exports = router;