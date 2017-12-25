const User = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get("/users", (req, res) => {
    const cookie = req.cookies;


    console.log("Cookie: ", cookie);
    User.find({})
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.json('Error searching users');
        });
});


router.post('/signup', (req, res) => {

    const {email, username, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);


    User.findOne({email})
        .then((existed_user) => {
            if (existed_user) {
                res.status(404).json("User already exist");
            } else {
                const newUser = User({
                    email, username, password: hash
                });

                newUser.save((err) => {
                    if (err)
                        res.status(200).json('Something happened');
                    res.status(200).json("User saved and created");
                });
            }
        })
        .catch((err) => {
            res.status(404).json("Connection error");
        })
});


router.post('/signin', (req, res) => {
    const {email, password} = req.body;

    const cookies = req.cookies;

    console.log("Cookie: ", cookies);
    User.findOne({email})
        .then((user) => {
            if (!bcrypt.compareSync(password, user.password)) {
                res.status(404).json('Password does not match');

            } else {
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: {
                        userId: user.id,
                        username: user.username
                    }
                }, 'studypsecret');
                res.cookie("token", token);
                res.json('User is now signed');
            }
        })
        .catch((err) => {
            res.status(404).json("Not user found!!");
        });


});


module.exports = router;

