// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const router = require("express").Router();
const db = require("../models")

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/", (req, res) => {

    idCount = 10;

    db.Recipes.findAll({
        attributes: [
            "id",
            "name",
            "ingredient",
            "instruction",
            "createdAt"
        ],
        include: {
            model: db.Users,
            attributes: [
                "id",
                "username",
                "firstName",
                "lastName"
            ]
        }

    }).then((data, err) => {
        if (err) throw err
        res.render("home")
    })
});

// router.get("/login", (req, res) => {
//   // If the user already has an account send them to the members page
//   if (req.user) {
//     res.redirect("/members");
//   }
//   res.sendFile(path.join(__dirname, "../public/login.html"));
// });

// // Here we've add our isAuthenticated middleware to this route.
// // If a user who is not logged in tries to access this route they will be redirected to the signup page
// router.get("/members", isAuthenticated, (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/members.html"));
// });

module.exports = router;