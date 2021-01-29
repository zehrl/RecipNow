// Requiring our models and passport as we've configured it
const db = require("../models");
const users = require("../models/users");
const router = require("express").Router();

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
router.post("/api/recipes", (req, res) => {
    db.Recipes.create({
        name: req.body.name,
        ingredient: req.body.ingredient,
        instruction: req.body.instruction,

        // ***UserId should be pulled using "req.user.UserId" when login stuff is figured out***
        UserId: req.body.userId
    }).then((data, err) => {
        if (err) throw err
        res.json(data);
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



module.exports = router;