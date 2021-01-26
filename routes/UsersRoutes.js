const db = require("../models");
const router = require("express").Router();
const isAuthenticated = require("../config/middleware/isAuthenticated");
const users = require("../models/users");

router.get("/api/user/:id", (req, res) => {
    // console.log(`req.params = ${req.params}`)
    // console.log(req.params)
    db.Users.findAll({ 
    where:{
        id: req.params.id 
     }
    }).then((data, err) => {
        console.log(`data = ${data}`)
        if (err) throw err
        res.json(data);
    })
});

router.post("/api/user", (req, res) => {
    db.Users.create({
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