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
      res.render("home", data)
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

// Route to login
router.post("/login",
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: "/signup"
  })
)

// router.get("/api/login", (req, res) => {
//   // If the user already has an account send them to the members page
//   if (req.user) {
//     res.redirect("/");
//   } else {
//     res.json({})
//   };
// });

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
// router.get("/members", isAuthenticated, (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/members.html"));
// });

// // Route for logging user out
// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });

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