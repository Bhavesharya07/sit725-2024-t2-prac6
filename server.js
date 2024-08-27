let express = require("express");
let app = express();
let dbConnect = require("./dbConnect");

//dbConnect.dbConnect()

let http = require('http').createServer(app);
let io = require('socket.io')(http);


// routes
let projectsRoute = require('./routes/projects')

var port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/api/projects', projectsRoute);


app.post('/appointments/submit_appointment', function(req, res) {
  let { fullName, phoneNumber, department, appointmentDate } = req.body;

  if (!fullName || !phoneNumber || !department || !appointmentDate) {
    return res.status(400).json({ statusCode: 400, message: "Missing required fields" });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(appointmentDate)) {
    return res.status(400).json({ statusCode: 400, message: "Invalid date format" });
  }

  console.log("Appointment booked:", { fullName, phoneNumber, department, appointmentDate });

  return res.status(200).json({ statusCode: 200, message: "Appointment booked successfully" });
});

app.get("/test", function (request, response) {
  var user_name = request.query.user_name;
  response.end("Hello " + user_name + "!");
});

app.get('/addTwoNumbers/:firstNumber/:secondNumber', function(req, res, next) {
  var firstNumber = parseInt(req.params.firstNumber);
  var secondNumber = parseInt(req.params.secondNumber);

  if (isNaN(firstNumber) || isNaN(secondNumber)) {
      res.json({ result: null, statusCode: 400 }).status(400);
  } else {
      var result = firstNumber + secondNumber;
      res.json({ result: result, statusCode: 200 }).status(200);
  }
});

// Socket test
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  setInterval(() => {
    socket.emit('number', parseInt(Math.random() * 10));
  }, 1000);
});

http.listen(port, () => {
  console.log("Listening on port ", port);
});
