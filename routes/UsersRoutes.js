const db = require("../models");
const router = require("express").Router();
const isAuthenticated = require("../config/middleware/isAuthenticated");
const users = require("../models/users");

// get user by id
router.get("/api/users/:id", (req, res) => {
    db.Users.findAll({
        attributes: [
            "id",
            "username",
            "firstName",
            "lastName"
        ],
        where: {
            id: req.params.id
        }
    }).then((data, err) => {
        console.log(`data = ${data}`)
        if (err) throw err
        res.json(data);
    })
});

module.exports = router;