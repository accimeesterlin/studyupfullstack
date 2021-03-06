const User = require('../models/user');
const University = require('../models/university');
const Event = require('../models/event');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rp = require('request-promise');

const router = express.Router();


/**
 * Generating a token for users including
 * their email, and user id
 * @param username
 * @param id
 * @returns {*}
 */
const generateToken = ({ username, id }) => {
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: {
            userId: id,
            username: username
        }
    }, 'studypsecret');

    return token;
};


/**
 * Verifying the user cookie before they can access
 * to our API
 * @param req
 * @param res
 * @param next
 */
const verifyCookie = (req, res, next) => {
    const { token } = req.cookies;

    jwt.verify(token, 'studypsecret', (err, decoded) => {
        if (err) {
            res.status(404).json(err);
        } else {
            req.user = decoded.data;
            next();
        }

    });
};


router.get('/geocode', (req, res) => {
    const address = req.param('address');
    const endpoint = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    const key = '&key=AIzaSyCRKkfdFDQBX9qDs8sbu5BD62GweN2kMg0';
    rp({
        uri: endpoint + address + key,
        method: 'GET',
        json: true
    })
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});


router.get("/users", verifyCookie, (req, res) => {
    const { userId } = req.user;
    User.findOne({ _id: userId })
        .select('-password')
        .populate('school event')
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => {
            res.status(404).json('Error searching users');
        });
});


router.post('/signup', (req, res) => {

    const {
        email,
        username,
        password,
        university,
        gender,
        cohort
    } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const add_university = new University({
        university,
        cohort
    });

    add_university.save((err) => {
        if (err) {
            res.status(400).json({ error: err })
        } else {
            User.findOne({ email })
                .then((existed_user) => {
                    if (existed_user) {
                        res.status(404).json("User already exist");
                    } else {
                        const newUser = User({
                            email,
                            username,
                            password: hash,
                            gender,
                            school: add_university._id
                        });

                        const token = generateToken(newUser);
                        res.cookie("token", token);

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
        }
    });


});


router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const cookies = req.cookies;
    User.findOne({ email })
        .then((user) => {
            if (!bcrypt.compareSync(password, user.password)) {
                res.status(404).json('Password does not match');

            } else {
                const token = generateToken(user);
                res.cookie("token", token);
                res.json('User is now signed');
            }
        })
        .catch((err) => {
            res.status(404).json("Not user found!!");
        });
});


router.post('/schedule', verifyCookie, (req, res) => {
    const { place, sms, date, group, subject } = req.body;

    const add_event = new Event({
        place,
        sms,
        date,
        group,
        subject
    });

    add_event.save((err) => {
        if (err) {
            res.status(400).json({ err });
        }
        else {
            User.findOne({ _id: req.user.userId })
                .then((user) => {
                    user.event.push(add_event._id);
                    user.save((err) => {
                        if (err)
                            return err;
                        res.json({ msg: true });
                    });
                })
                .catch((err) => {
                    res.status(400).json({ err });
                });
        }
    });
});


router.post("/delete/event", verifyCookie, (req, res) => {
    const { _id } = req.body;
    console.log("ID: ", _id);


    Event.remove({ _id })
        .then((deleted) => {

            User.findOne({ _id: req.user.userId })
                .then((user) => {
                    user.event.pull({ _id });
                    user.save((err) => {
                        if (err)
                            console.log("Error occurs");
                        res.json({ _id });
                    });
                })
                .catch(() => {
                    // TODO
                });
        })
        .catch((err) => {
            // TODO
        });
});


// Dummy Test
router.get('/check_schedules', (req, res) => {
    User.findOne({ email: 'accimeesterlin@yahoo.com' })
        .select('-password')
        .populate('event')
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.json(err);
        });
});




// Dummy Test
router.get('/events', verifyCookie, (req, res) => {
    Event.find({})
        .then((events) => {
            res.json(events);
        })
        .catch((err) => {
            res.json(err);
        });
});


module.exports = router;
