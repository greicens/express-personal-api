// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

 var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/greicens/express-personal-api/blob/master/README.md",
    baseUrl: "http://gsilva.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "GET", path: "/api/projects", description: "Sends all projects as JSON"},
      {method: "POST", path: "/api/projects", description: "Add a new project do the database"},
      {method: "GET", path: "/api/projects/:id", description: "Sends one project as JSON"}
    ]
  })
});

//route to view profile info
app.get('/api/profile', function api_profile(req, res){
  res.json({
    name: 'Greice Silva',
    githubUsername: 'greicens',
    githubLink: 'https://github.com/greicens',
    githubProfileImage: 'https://avatars2.githubusercontent.com/u/8587524?v=3&s=400',
    personalSiteLink: 'https://greicens.github.io/',
    currentCity: 'San Francisco',
    pets: []
  });
});

//send all projects as JSON response
app.get('/api/projects', function api_projects(req, res){
  db.Project.find(function(err, projects){
    if(err){ return console.log("index error: " + err);}
    res.json(projects);
  });

});

//send one specific book id as JSON response
app.get('/api/projects/:id', function(req, res){
  var projectId = req.params.id;

  db.Project.findOne({_id: projectId}, function(err, foundProject){
    res.json(foundProject);
  });
});

//post a new project (add one project to da database)
app.post('/api/projects', function(req, res){
  var newProject = new db.Project(req.body);

  newProject.save(function(err, savedProject){
    res.json(savedProject);
  });
});




/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
