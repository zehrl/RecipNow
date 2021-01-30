// Requiring our models and passport as we've configured it
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
const users = require("../models/users");
const router = require("express").Router();
const { Op } = require("sequelize");

// ------------ Recipes CRUD Routes ------------

// create recipe route
// user must be logged into account and only adds recipe for the signed in user
router.post("/api/recipes", isAuthenticated, (req, res) => {

    db.Recipes.create({
        name: req.body.name,
        ingredient: req.body.ingredient,
        instruction: req.body.instruction,
        UserId: req.user.id
    }).then((data, err) => {
        if (err) {
            throw err
        } else {

            // When successful, redirect to profile to load new recipe
            // res.redirect("/profile")
        }
    })
})

// delete recipe by id route
router.delete("/api/recipes/:id", (req, res) => {
    db.Recipes.destroy({
        where: {
            id: req.params.id
        }
    }).then((data, err) => {
        if (err) throw err
        res.json(data);
    })
})

// update recipe by id route
router.put("/api/recipes", (req, res) => {

    db.Recipes.update({
        ingredient: req.body.ingredients,
        instruction: req.body.instructions,
        name: req.body.name
    }, {
        where: {
            id: req.body.id
        }
    }).then((data, err) => {
        if (err) throw err
        res.json(data);
    })
})

// ------------ Search Route(s) ------------

// Search query for recipe name & ingredients?
router.get(("/search"), (req, res) => {

    console.log(req.query.ingredient)

    db.Recipes.findAll({
        attributes: [
            "name",
            "ingredient",
            "instruction",
            "id",
            "createdAt"
        ],

        // search recipes table using "like" operation in the recipe column of recipes table
        where: {

            ingredient:
            {
                [Op.like]: `%${req.query.ingredient}%`
            }
        },

        include: {
            model: db.Users,
            attributes: [
                "username",
                "firstName",
                "lastName"
            ],
        }

    }).then((data, err) => {

        if (err) {
            res.json(err)
        } else {

            // change sequalize object into handlebars friendly object
            const hbsData = data.map(element => {
                return element.dataValues
            });

            // console.log("data = ", data)
            console.log("hbsData = ", hbsData)

            // if logged in, render the home page with search results
            if (req.user) {

                res.render("home", { results: hbsData })

            } else { // if logged out, render the signup page with search results

                res.render("signup", { results: hbsData })

            }

        }
    })

})


module.exports = router;