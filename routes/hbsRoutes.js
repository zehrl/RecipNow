// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const router = require("express").Router();
const db = require("../models")

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

// Home Page HBS Route
router.get("/", (req, res) => {
    req.user ? res.render("home") : res.render("signup");
});

// Profile HBS Route
// Checks if user is signed in using "isAuthenticated"
router.get("/profile", isAuthenticated, (req, res) => {
    if (!req.user) {

        // The user is not logged in, redirect to signup route
        console.log("Redirecting to signup...")
        res.redirect("/signup")

    } else {

        // find data of user that is logged in & all recipes associated with the account
        db.Users.findAll({
            attributes: [
                "username",
                "firstName",
                "lastName"
            ],
            where: {
                username: req.user.username
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

            // Map sequalize object into handlebars friendly
            data[0].Recipes = data[0].Recipes.map(element => {
                return element.dataValues
            })

            // Parse data from database into handlebars friendly object
            const hbsData = {
                username: data[0].username,
                firstName: data[0].firstName,
                lastName: data[0].lastName,
                recipes: data[0].Recipes
            }

            // console.log(hbsData.recipes);
            // console.log(hbsData.recipes);

            res.render("profile", hbsData)

        })
    }
});

// Signup HBS Route

router.get("/signup", (req, res) => {
    res.render("signup")
});

module.exports = router;