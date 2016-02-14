var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongoose-demo');

// schema relates to a model
// schema name - whatever the model name with capital schema after it
// i.e. model name is drawing, schema name is drawingSchema
var drawingSchema = mongoose.Schema({name: String});
// instansiates
// create a single model, collection makes it plural for you
var Drawing = mongoose.model('Drawing', drawingSchema);

var app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));

app.get('/drawings', function (req, res) {
  // var newDrawing = new Drawing({ name: 'FooPoo' });
  // newDrawing.save();
  res.send('What it doooooooo');
});

app.get('/drawings/:id', function (req, res) {
  var id = req.params.id;

  Drawing.findOne({ _id: id })
  .then(function (result) {
    res.send(result);
  });
});

app.post('/drawings', function (req, res) {
  var newDrawing = new Drawing({name: req.body.name});
  newDrawing.save();
  res.send('Post went through!');
});

app.put('/drawings/:id', function (req, res) {
  var id = req.params.id;

  Drawing.update({ _id: id },
    { $set: { name: req.body.name} })
  .then(function (result) {
    res.json(result);
  });
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  var server = app.listen(3000, function() {
    console.log('Listening to port', server.address().port);
  });
});