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

// This route is obselete, but we are keeping it just in case
// router.post("/api/user", (req, res) => {
//     db.Users.create({
//         username: req.user.username,
//         password: req.user.password,
//         firstName: req.user.firstName,
//         lastName: req.user.lastName,
//         email: req.user.email
//     }).then(newUser => {
//         res.json(newUser);
//     });
// })

module.exports = router;