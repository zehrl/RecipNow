const { Users } = require("../models");
const router = require("express").Router();
const isAuthenticated = require("../config/middleware/isAuthenticated");


router.get("/api/Users", (req, res) => {
    Users.findAll({}).then(Users => {
        res.json(Users);
    });
});


router.post("/api/Users", (req, res) => {
    Users.create({
        username: req.user.username,
        password: req.user.password,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email
    }).then(newUser => {
        res.json(newUser);
    });
})


module.exports = router;