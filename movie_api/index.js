var express = require("express");
var bodyParser = require("body-parser");
var app = express();
uuid = require("uuid");
app.use(bodyParser.json());
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology:true
});

//use the Morgan middleware library to log all requests
morgan = require("morgan");
app.use(morgan("common"));

//GET requests
app.get("/", function(req, res) {
  res.send("Welcome to my Adventure movie collection!");
});
app.get("/documentation", function(req, res) {
  res.sendFile("public/documentation.html", { root: __dirname });
});
app.get("/movies", function(req, res) {
  res.json(Movies);
});

// app.get movies by title",



//get all users//
app.get("/users", function(req,res){
  Users.find()
  .then(function(users){
    res.status(201).json(users)
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//get user by username
app.get("/users:Username", function(req, res){
  Users.findOne({ Username: req.params.Username })
  .then(function(user){
    res.json(user)
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


//get all movies
app.get("/movies", function(req, res) {
  Movies.find()
  .then(function(movies){
    res.status(201).json(movies)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//get movie by title
app.get("/movies/:Title", function(req, res) {
  Movies.findOne({ Title: req.params.Title })
    .then(function(movie) {
      res.json(movie);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//get movie director by name
app.get("/movies/directors/:Name", function(req, res) {
  Movies.findOne({ "Director.Name": req.params.Name })
    .then(function(movies) {
      res.status(201).json(movies.Director);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//get data about genre by movie title
app.get(
  "/movies/genres/:Title",function(req, res) {
    Movies.findOne({Title: req.params.Title })
    .then(function(movie){
      res
      .status(201)
      .send(
        movie.Genre.Name + " : " + movie.Genre.Description
        );
    })
    .catch(function(error){
      console.error(error);
      res.status(500).send("Error" + error);
    });
  }
);

//Add data of a new user to the list of users
app.post("/users", function(req, res) {
  Users.findOne({ Username: req.body.Username })
    .then(function(user) {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then(function(user) {
            res.status(201).json(user);
          })
          .catch(function(error) {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});


// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put("/users/:Username", function(req, res) {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }, // This line makes sure that the updated document is returned
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});



// Delete a user by username
app.delete("/users/:Username", function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then(function(user) {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//use express.static
//to serve  “documentation.html” file from the public folder
app.use(express.static("public"));
app.use(bodyParser.json());

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
