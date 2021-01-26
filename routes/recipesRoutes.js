// Requiring our models and passport as we've configured it
const db = require("../models");
const router = require("express").Router();


// create recipe route
router.post("/api/recipes", (req, res) => {
    db.Recipes.create({
        name: req.body.name,
        ingredient: req.body.ingredient,
        instruction: req.body.instruction,
        UserId: req.body.userId
    }).then((data, err) => {
        console.log(req.body)
        if (err) throw err
        res.json(data);
    })
})

// delete recipe route


// update recipe route

module.exports = router;