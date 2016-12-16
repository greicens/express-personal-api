var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/gsilva");

module.exports.Project = require("./project.js");
