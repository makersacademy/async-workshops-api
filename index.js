var express = require('express');

// middleware to allow cross domain requests
function allowCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers',
             'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
};

// pulls out basic information to send when listing users
function peopleBasicInformation(people) {
  return people.map(function(person) {
    return { id: person.id, name: person.name };
  });
};

// gets person who has passed id
function getPersonWithId(people, id) {
  for (var i = 0; i < people.length; i++) {
    if (people[i].id === id) {
      return people[i];
    }
  }
};

// data

var people = [
  { id: 0, name: "Mary", favouriteMusic: "Sunset Rubdown" },
  { id: 1, name: "Lauren", favouriteMusic: "Texas folk" },
  { id: 2, name: "Isla", favouriteMusic: "Frozen soundtrack" },
  { id: 3, name: "Sam", favouriteMusic: "We Will Rock You by Queen" },
];

// create app

var app = express();

// allow cross domain requests

app.use(allowCrossDomain);

// routes

app.get('/people', function(request, response) {
  response.json(peopleBasicInformation(people));
});

app.get('/people/:id', function(request, response) {
  var id = parseInt(request.params.id);
  response.json(getPersonWithId(people, id));
});

// start app

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
