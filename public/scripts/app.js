console.log("Sanity Check: JS is working!");
var template;
var $projectsList;
var allProjects = [];

$(document).ready(function(){

  $projectsList = $('#projectTarget');

  var source = $('#projects-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/projects',
    success: onSuccess,
    error: onError
  });

  $('#newProjectForm').on('submit', function (target){
    target.preventDefault();
    console.log('new project serialized', $(this).serializeArray());
    $.ajax({
      method: 'POST',
      url: 'api/projects',
      data: $(this).serializeArray(),
      success: newProjectSucess,
      error: newProjectError
    });
  });

});

function render(){
  $projectsList.empty();
  var projectHtml;
  allProjects.forEach(function(projectData){
    projectHtml = template({ project: projectData });
    $projectsList.append(projectHtml);
  });

}



function onSuccess(projectData){
  allProjects = projectData;
  console.log("allProjects ", allProjects);
  render();

}

function onError(){
  console.log('onError error');
  $('#projectTarget').text('Failed to load projects, is the server working?');

}

function newProjectSucess(json){
  $('#newProjetForm input').val('');
  allProjects.push(json);//what does this do?
  console.log("new project created", json);
  render();
}

function newProjectError(){
  console.log('new project error!');
}
