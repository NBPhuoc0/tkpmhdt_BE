const db = require("../models");
const Joi = require('joi');

module.exports = {
    registerValidator : (req, res, next) => {
        const schema = Joi.object({
            username: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
            phone_number: Joi.string(),
            full_name : Joi.string(),
            address : Joi.string(),
            avatar : Joi.string()
        }); 
        try {
            const value = schema.validate(req.body);
            if (value.error) {
                res.status(400).send({ message: value.error.details[0].message });
                return;
            }
        } catch (err) {
            res.status(500).send({ message: err });
            return;
        }
        next();
    },
    
    checkDuplicateUsernameOrEmail : async (req, res, next) => {
        if (!req.body.username || !req.body.email || !req.body.password) {
            return res.status(400).send({
              message: "Content can not be empty!"
            });
            
        }
        try {
            const user = await db.user.findOne({
                where: {
                    username: req.body.username,
                }
            });
            if (user) {
                return res.status(400).send({
                    message: "Failed! Username is already in use!"
                });
            }
            const email = await db.user.findOne({
                where: {
                    email: req.body.email,
                }
            });
            if (email) {
                return res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
            }
        } catch (err) {
            return res.status(500).send({ message: err })
        }
        
        next();
    
    }
}