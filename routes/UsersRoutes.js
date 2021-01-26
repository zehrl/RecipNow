const { Users } = require("../models");
const router = require("express").Router();
const isAuthenticated = require("../config/middleware/isAuthenticated");
const users = require("../models/users");


router.get("/api/user/:id",  (req, res) => {
    Users.findAll({ 
    where:{
        id: req.params.id 
     }
    }).then((Users, err) => {
        if (err) throw err
        res.json(Users);
    })
});

router.post("/api/user", (req, res) => {
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

// bio route

module.exports = router;