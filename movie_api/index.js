const express = require("express");
const app = express();

let topMovies = [
	{
		title: "Rocky1"
	},
	{
		title: "Rocky2"
	},
	{
		title: "Rocky3"
	},
	{
		title: "Rocky4"
	},
	{
		title: "Rocky5"
	},
	{
		title: "Rambo1"
	},
	{
		title: "Rambo2"
	},
	{
		title: "Rambo3"
	},
	{
		title: "Rambo4"
	},
	{
		title: "Rambo5"
	}
];
//GET requests
app.get("/", function(req, res) {
	res.send("Welcome to my Sylvester Stallone movie collection!");
});
app.get("/documentation", function(req, res) {
	res.sendFile("public/documentation.html", { root: __dirname });
});
app.get("/movies", function(req, res) {
	res.json(topMovies);
});
//use express.static
//to serve  “documentation.html” file from the public folder
app.use(express.static("public"));

//use the Morgan middleware library to log all requests
morgan = require("morgan");
app.use(morgan("common"));

app.get("/secreturl", function(req, res) {
	res.send("This is a secret url with super top-secret content.");
});

//creating error-handling middleware
//function that will log all application-level errors to the terminal

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

// listen for requests
app.listen(8080, () => console.log("Your app is listening on port 8080."));
