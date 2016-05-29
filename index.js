var express = require('express');

function allowCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
};

function basicInformation(people) {
  return people.map(function(person, i) {
    return { id: i, name: person.name };
  });
};

var people = [
  { name: "Mary", favouriteMusic: "Sunset Rubdown" },
  { name: "Lauren", favouriteMusic: "Texas folk" },
  { name: "Isla", favouriteMusic: "Frozen soundtrack" },
  { name: "Sam", favouriteMusic: "We Will Rock You by Queen" },
];

// create app

var app = express();

// allow cross domain requests

app.use(allowCrossDomain);

// routes

app.get('/people', function(request, response) {
  response.json({ people: basicInformation(people) });
});

app.get('/person/:id', function(request, response) {
  var id = request.params.id;
  response.json({ person: people[id] });
});

// start app

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
