const db = require("../models");

module.exports = {
    checkDuplicateUsernameOrEmail : (req, res, next) => {
        // Username
        if (db.user.findOne({username: req.body.username}).catch(err => {
            res.status(500).send({ message: err });
            return;
        })) {
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }
    
        // Email
        if (db.user.findOne({email: req.body.email}).catch(err => {
            res.status(500).send({ message: err });
            return;
        })) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
        }
    
        next();
    
    }
}