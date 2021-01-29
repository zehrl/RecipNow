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
            // return res.json(data) to confirm success
            res.json(data);
        }
    })
})

// delete recipe by id route
router.delete("/api/recipes/", (req, res) => {
    db.Recipes.destroy({
        where: {
            id: req.body.id
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
        instruction: req.body.instructions
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
router.get(("/api/search"), (req, res) => {

    console.log(req.query.search)

    db.Recipes.findAll({
        attributes: [
            "name",
            "ingredient",
            "instruction",
            "createdAt"
        ],

        // search recipes table using "like" operation in the recipe column of recipes table
        where: {

            ingredient:
            {
                [Op.like]: `%${req.query.search}%`
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
        
        // change to res.render with correctly structured object for handlebars
        err ? res.json(err) : res.json(data)
    })

})


module.exports = router;