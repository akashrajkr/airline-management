var express = require('express');
var router = express.Router();
let con = require('./mysqlConnect');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('search', { title: 'Find flights' });
});

router.get('/api/fromfetch', (req,res) =>{
  var sql = 'select distinct source from route';
  var froms = [];
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    result.forEach(element => {
      froms.push(element.source);
    });
    res.send(froms);
  });
  
})

router.get('/api/tofetch', (req,res) =>{
  var from = req.query.from;
  console.log(from);
  var sql = 'select distinct destination from route where source = ?';
  var tos = [];
  con.query(sql,from, function (err, result) {
    console.log(result);
    if (err) throw err;
    result.forEach(element => {
      tos.push(element.destination);
    });
    res.send(tos);
  });
  
})

router.post("/api/search",(req,res)=>{
  var from = req.body.from;
  var to = req.body.to;
  var date = req.body.date;
  var results = []
  var sql = "select * from aircraft a, schedule f, route r where a.aircraft_id = f.aircraft_id and f.route_id=r.route_id and r.source = ? and r.destination = ? and DATE(f.departure) =?";
  con.query(sql,[from,to,date],function(err,result){
    if(err) throw err;
    console.log(result);
    result.forEach(element => {
      results.push(element);
      console.log(results);
    })
    console.log(results);
    res.send(results);
  })
})
module.exports = router;