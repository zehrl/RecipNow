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
      res.render("home")
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

// Route to login
// will return "Unauthorized" if it fails
router.post("/login", passport.authenticate("local"), (req, res, err) => {
  res.render("home")
});

// Route for logging user out
router.get("/logout", (req, res) => {

  req.user ? console.log("Before: User is logged in.") : console.log("Before: User is logged out.");

  req.logout();

  // Send user to homepage (logged out version)
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