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

        // ***need to format "data" correctly to be able to use with templates***
        res.render("home", data)
    })
});

// Route when clicking on "account" button
router.get("/account", isAuthenticated, (req, res) => {
    if (!req.user) {
        // The user is not logged in, send back an empty object
        //   res.json({});
        console.log("Redirecting to signup...")
        res.render("signup")
    } else {

        console.log("Redirecting to profile of user...")

        const username = req.user.username;

        // If logged in, redirect to user profile
        res.redirect(`/profile/${username}`);
    }
});

// Route for signing up
router.get("/signup", (req, res) => {
    res.render("signup")
});

// Route for showing profile of a given user
router.get("/profile/:username", (req, res) => {
    db.Users.findAll({
        attributes: [
            "username",
            "firstName",
            "lastName"
        ],
        where: {
            username: req.params.username
        },
        include: {
            model: db.Recipes,
            attributes: [
                "name",
                "ingredient",
                "instruction",
                "createdAt"
            ],
        }
    }).then((data, err) => {

        // ***need to format "data" correctly to be able to use with templates***
        res.render("profile", data)
    })
});

module.exports = router;