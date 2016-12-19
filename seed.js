// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var project_list = [
  {
    name: "Personal Website",
    description: "My first website created at GA",
    githubRepoUrl: "https://github.com/greicens/greicens.github.io.git",
    deployedUrl: "https://greicens.github.io/",
    screenshot: "images/personal_website_pic.png"
  },
  {
    name: "Tic Tac Toe",
    description: "Simple tic tac toe built using boostrap and event listeners",
    githubRepoUrl: "https://github.com/greicens/tic-tac-toe.git",
    deployedUrl: "",
    screenshot: "images/tic_tac_toe.png"
  },
  {
    name: "Project 0",
    description: "A racing swimming game built using boostrap and event listeners",
    githubRepoUrl: "https://github.com/greicens/greicens-Project-0.github.io.git",
    deployedUrl: "https://greicens.github.io/greicens-Project-0.github.io/",
    screenshot: "images/project0.png"

  }
];

db.Project.remove({}, function(err, projects){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all projects');

    db.Project.create(project_list, function(err, projects){
      if (err) {
        return console.log('err', err);
      }
      console.log("created", projects.length, "projects");
      process.exit();
    });
  }
});
