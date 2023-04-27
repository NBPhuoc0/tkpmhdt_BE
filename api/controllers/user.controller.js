const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const bcrypt = require("bcrypt");

module.exports = {
    signup : async (req, res) => {

        const salt = bcrypt.genSaltSync(7)

        const hashPass = bcrypt.hashSync(req.body.password, salt)

        // get data from request body
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: hashPass
        };

        // save user in the database
        db.user.create(user)
        .then(data => {
            res.status(200).send({
                message: "User was registered successfully!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        });
    },

    signin : (req, res) => {
        if (!req.body.username && !req.body.password) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
            return;
        }

        // get data from request body
        const user = {
            username: req.body.username,
            password: req.body.password
        };

        // save user in the database
        db.user.findOne({
            where: {
                username: user.username,
            }
        })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "User Not found."
                });
            }

            if ( !bcrypt.compareSync(user.password, data.password) ){
                return res.status(401).send({
                    message: "Wrong Password!"
                });
            }

            var token = jwt.sign({ id: data.id, isAdmin : data.isAdmin }, config.secret, {
                expiresIn: 60*60*24 // 24 hours
            });
            res.status(200).send({
                authToken: token
            });
            
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        });
    },

    updateProfile : (req, res) => {
        if (!req.body) {
            return res.status(400).send({
              message: "Content can not be empty!"
            });
        }
        // save user in the database
        db.user.update(req.body, {
            where: {
                id: req.user_id
            }
        })
        .then(data => {
            res.status(200).send({
                message: "User was updated successfully!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while updating the user."
            });
        });
    },

    findAll : (req, res) => {
        db.user.findAll({
            attributes: { exclude: ["password"] }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
    },

    findByid : (req, res) => {
        const id = req.user_id;
        
        db.user.findByPk(id,{
            attributes: { exclude: ["password"] }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id=" + id
            });
        });
    },

    changePassword: async (req, res) => {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user_id;
      
        // Check if required data is provided
        if (!oldPassword || !newPassword) {
          return res.status(400).send({ message: "Old password and new password are required." });
        }
      
        try 
        {
            // Find user by id from database
            const user = await db.user.findByPk(userId);
      
            if (!user) {
                return res.status(404).send({ message: "User not found." });
            }
      
            // Check if old password is correct
            const isPasswordCorrect = bcrypt.compareSync(oldPassword, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).send({ message: "Invalid old password." });
            }
      
            // Hash new password and update in database
            const salt = bcrypt.genSaltSync(7);
            const hashPass = bcrypt.hashSync(newPassword, salt);
      
            await db.user.update({ password: hashPass }, { where: { id: userId } });
      
            return res.status(200).send({ message: "Password updated successfully." });
      
        } 
        catch (error) {
            return res.status(500).send({ message: "An error occurred while updating password." });
        }
    }
    
}