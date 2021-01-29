// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const router = require("express").Router();
const db = require("../models")

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

// Home Page HBS Route
router.get("/", (req, res) => {

    res.render("home");

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

            // If logged in, render profile.handlebars with data of user & recipes
            
            // Troubleshooting on Postman
            // console.log("Redirecting to account/recipe creation page...")
            // res.json(data)

            hbsData = {
                username: data[0].username,
                firstName: data[0].firstName,
                lastName: data[0].lastName,
                recipes: data[0].Recipes
            }

            // Troubleshooting
            // res.json(hbsData)
            
            res.render("profile", hbsData)

        })
    }
});

// Signup HBS Route

router.get("/signup", (req, res) => {
    res.render("signup")
});

module.exports = router;

// Route for showing profile of a given user
// Returns data of user and all recipes of user
// router.get("/profile/:username", (req, res) => {
//     db.Users.findAll({
//         attributes: [
//             "username",
//             "firstName",
//             "lastName"
//         ],
//         where: {
//             username: req.params.username
//         },
//         include: {
//             model: db.Recipes,
//             attributes: [
//                 "name",
//                 "ingredient",
//                 "instruction",
//                 "createdAt"
//             ],
//         }
//     }).then((data, err) => {

//         hbsData = {
//             name: data.firstName,
//             username: data.username,
//             aboutMe: "Bio data here. We do not have this in the database yet. It should be easy to add"
//         }

//         // ***need to format "data" correctly to be able to use with templates***
//         res.render("profile", data)
//     })
// });



    // Old code that isn't needed anymore
    // idCount = 10;

    // db.Recipes.findAll({
    //     attributes: [
    //         "id",
    //         "name",
    //         "ingredient",
    //         "instruction",
    //         "createdAt"
    //     ],
    //     include: {
    //         model: db.Users,
    //         attributes: [
    //             "id",
    //             "username",
    //             "firstName",
    //             "lastName"
    //         ]
    //     }

    // }).then((data, err) => {
    //     if (err) throw err

    //     // ***need to format "data" correctly to be able to use with templates***
    //     res.render("home", data)
    // })