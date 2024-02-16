// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", (req, res) => {
  let unix = new Date().getTime();
  let utc = new Date().toUTCString();
  
  return res.json({ unix: unix, utc: utc });
})

app.get("/api/:date?", (req, res) => {
  let date = req.params.date;

  if (!isNaN(Number(date))) {
    let unix = new Date(Number(date)).getTime();
    let utc = new Date(Number(date)).toUTCString();
    
    return res.json({ unix: unix, utc: utc });
  }

  let unix = new Date(date).getTime();

  if(isNaN(unix)) return res.json({ error: "Invalid Date" })

  let utc = new Date(Date.parse(date)).toUTCString();

  return res.json({ unix: unix, utc: utc });
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;