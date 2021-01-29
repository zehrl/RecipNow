// Requiring our models and passport as we've configured it
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
const users = require("../models/users");
const router = require("express").Router();
const { Op } = require("sequelize");

// ------------ Recipes CRUD Routes ------------

// // get recipe from ID
// router.get("/api/recipes/:id", (req, res) => {
//     db.Recipes.findAll({
//         where: {
//             id: req.params.id
//         }
//     }).then((data, err) => {
//         ``
//         console.log(req.body)
//         if (err) throw err
//         res.json(data);
//     })
// })

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

        // search recipes table like query search variable
        where: {
            
            // id: "7"
            ingredient:
            {
                [Op.like]: `%${req.query.search}%`
            }
        }

    }).then((data, err) => {
        err ? res.json(err) : res.json(data)
    })

})


module.exports = router;