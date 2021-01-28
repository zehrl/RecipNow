// Requiring our models and passport as we've configured it
const db = require("../models");
const router = require("express").Router();
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const { route } = require("./hbsRoutes");
const { nextTick } = require("process");

// Route to signup
router.post("/signup", (req, res) => {

  db.Users.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  })
    .then((data) => {

      // ***need to format "data" correctly to be able to use with templates***
      res.render("home", data)
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

// Route to login
// ***route doesn't work properly. Reference the section-15->important->passport example. We need to see if our config/setup files are correct. (ex. are we calling the correct databases in passport.js?)
router.post("/login", passport.authenticate("local"), (req, res) => {

  res.json({
    email: req.user.email,
    id: req.user.id
  });
});

// Route for logging user out
router.get("/logout", (req, res) => {
  
  // ***LZ - I was trying to trouble shoot here. We should have a req.user object if the user is signed in. The logic below is an "if...else" statement but in the ?: format
  req.user ? console.log("Before: User is logged in.") : console.log("Before: User is logged out.");
  req.logout();
  res.redirect("/");
  req.user ? console.log("After: User is still logged in") : console.log("After: User is now logged out.");
});

// Route for getting some data about our user to be used client side
router.get("/api/user_data", (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
});

module.exports = router;