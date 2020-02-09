var express = require("express");
var bodyParser = require("body-parser");
var app = express();
uuid = require("uuid");
app.use(bodyParser.json());

let Movies = [
  {
    title: "Out of Africa",
    director: "Sydney Pollack",
    year: "1985",
    description:
      "In 20th-century colonial Kenya, a Danish baroness/plantation owner has a passionate love affair with a free-spirited big-game hunter.",
    genre: ["Drama", "Biography", "Adventure"],
    leadingMan: "Robert Redford",
    leadingFemale: "Meryl Streep"
  },
  {
    title: "Avatar",
    director: "James Cameron",
    year: "2009",
    description:
      "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    genre: ["Action", "Adventure"],
    leadingMan: "Sam Worthhington",
    leadingFemale: "Michelle Rodriguez"
  },
  {
    title: "Cast Away",
    director: "Robert Zemeckis",
    year: "2000",
    description:
      "A FedEx executive undergoes a physical and emotional transformation after crash landing on a deserted island.",
    genre: ["Adventure", "Drama"],
    leadingMan: "Tom Hanks",
    leadingFemale: "Helen Hunt"
  },
  {
    title: "Back to the Future",
    director: "Robert Zemeckis",
    year: "1985",
    description:
      "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.",
    genre: ["Adventure", "Si-Fi"],
    leadingMan: ["Michael J.Fox", "Christopher Lloyd"],
    leadingFemale: "Lea Thompson"
  },

  {
    title: "Raiders of the Lost Ark ",
    director: "Steven Spilberg",
    year: "1985",
    description:
      "In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before Adolf Hitler's Nazis can obtain its awesome powers.",
    genre: ["Adventure", "Action", "Comedy"],
    leadingMan: "Harrison Ford",
    leadingFemale: "Karen Allen"
  },
  {
    title: "Indiana Jones and the Last Crusade",
    director: "Steven Spilberg",
    year: "1985",
    description:
      "In 1938, after his father Professor Henry Jones, Sr. goes missing while pursuing the Holy Grail, Professor Henry Indiana Jones, Jr. finds himself up against Adolf Hitler's Nazis again to stop them from obtaining its powers.",
    genre: ["Adventure", "Action", "Comedy"],
    leadingMan: "Harrison Ford",
    leadingFemale: "Allison Doody"
  },

  {
    title: "Jurassic Park",
    director: "Steven Spilberg",
    year: "1993",
    description:
      "A pragmatic Paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
    genre: ["Adveture", "Action"],
    leadingMan: "Sam Neil",
    leadingFemale: "Laura Dern"
  },
  {
    title: "Jaws",
    director: "Steven Spilberg",
    year: "1975",
    description:
      "When a killer shark unleashes chaos on a beach community, it's up to a local sheriff, a marine biologist, and an old seafarer to hunt the beast down.",
    genre: ["Drama", "Adventure"],
    leadingMan: "Roy Scheider",
    leadingFemale: "Lorraine Gary"
  },
  {
    title: "The Big Blue",
    director: "Luc Besson",
    year: "1988",
    description:
      "The rivalry between Enzo and Jacques, two childhood friends and now world-renowned free divers, becomes a beautiful and perilous journey into oneself and the unknown.",
    genre: ["Drama", "Adventure", "Sport"],
    leadingMan: "Jean-Marc Barr",
    leadingFemale: "Rossana Arquette"
  },

  {
    title: " Gladiator",
    director: "Ridley Scott",
    year: "1997",
    description:
      "Two disparate people have a wonderful romance, but their political views and convictions drive them apart.",
    genre: ["Drama", "Adventure", "Action"],
    leadingMan: "Russel Crowe",
    leadingFemale: "Connie Nielsen"
  }
];

let Genres = [
  {
    name: "Drama",
    description:
      "Drama film is a genre that relies on the emotional and relational development of realistic characters. While Drama film relies heavily on this kind of development, dramatic themes play a large role in the plot as well. Often, these dramatic themes are taken from intense, real life issues"
  },
  {
    name: "Adveture",
    description:
      "Adventure films are a genre of film that typically use their action scenes to display and explore exotic locations in an energetic way."
  },
  {
    name: "Action",
    description:
      "Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, and frantic chases. Action films tend to feature a resourceful hero struggling against incredible odds, which include life-threatening situations, a villain, or a pursuit which usually concludes in victory for the hero (though a small number of films in this genre have ended in the victory for the villain instead)"
  },
  {
    name: "Comedy",
    description:
      "A comedy film is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect."
  },
  {
    name: "Biography",
    description:
      "A biographical film, or biopic abbreviation for biographical motion picture), is a film that dramatizes the life of a non-fictional or historically-based person or people. Such films show the life of a historical person and the central character's real name is used."
  }
];

let Directors = [
  {
    name: "Steven Spilberg",
    bio: "",
    birthyear: "",
    deathyear: ""
  },

  {
    name: "Sydney Pollack",
    bio: "",
    birthyear: "",
    deathyear: ""
  },
  {
    name: "Ridley Scott",
    bio: "",
    birthyear: "",
    deathyear: ""
  },
  {
    name: "Robert Zemeckis",
    bio: "",
    birthyear: "",
    deathyear: ""
  },

  {
    name: "Luc Besson",
    bio: "",
    birthyear: "",
    deathyear: ""
  },
  {
    name: "James Cameron",
    bio: "",
    birthyear: "",
    deathyear: ""
  }
];

let Users = [
  {
    id: "0",
    name: "Michael Blunt",
    username: "Michael",
    password: "Mi123",
    email: "",
    birthday: "",
    favourites: ""
  },
  {
    id: "1",
    name: "Kate Norman",
    username: "Katie",
    password: "Kitty11",
    email: "",
    birthday: "",
    favourites: ""
  }
];

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

// app.get("/movies/:title", (req, res) => {
// 	res.json(
// 		Movies.find(movie => {
// 			return movie.title === req.params.title;
// 		})
// 	);
// });

app.get("/movies/:title", (req, res) => {
  res.json(
    Movies.find(movie => {
      return movie.title.toLowerCase().includes(req.params.title.toLowerCase());
    })
  );
});

//Get movie by genre
app.get("/genres/:name", (req, res) => {
  res.json(
    Genres.find(genre => {
      return genre.name.toLowerCase().includes(req.params.name.toLowerCase());
    })
  );
});

//Get data about directors by name
app.get("/directors/:name", (req, res) => {
  res.json(
    Directors.find(director => {
      return director.name
        .toLowerCase()
        .includes(req.params.name.toLowerCase());
    })
  );
});

//Get the list of users
app.get("/users", (req, res) => {
  res.json(Users);
});

//Add data of a new user to the list of users
app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    Users.push(newUser);
    res.status(201).send(newUser);
  }
});

// Update the info of a user by id
app.put("/users/:id", (req, res) => {
  let user = Users.find(user => {
    return user.id === req.params.id;
  });
  let newUserInfo = req.body;

  if (user && newUserInfo) {
    // preserve the user id
    newUserInfo.id = user.id;
    // preserve the user favorites
    newUserInfo.favorites = user.favorites;
    // merge old info and new info (TODO: validate new info)
    Object.assign(user, newUserInfo);
    // merge user with update info into the list of Users
    Users = Users.map(user =>
      user.id === newUserInfo.id ? newUserInfo : user
    );
    res.status(201).send(user);
  } else if (!newUserInfo.name) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    res.status(404).send("User with id " + req.params.id + " was not found.");
  }
});

// Delete a user from the list by ID
app.delete("/users/:id", (req, res) => {
  let user = Users.find(user => {
    return user.id === req.params.id;
  });

  if (user) {
    Users = Users.filter(function(obj) {
      return obj.id !== req.params.id;
    });
    res.status(201).send("User " + user.name + req.params.id + " was deleted.");
  }
});

// Get a user from the list by ID
app.get("/users/:id", (req, res) => {
  res.json(
    Users.find(user => {
      return user.id === req.params.id;
    })
  );
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
