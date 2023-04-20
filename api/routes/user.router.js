module.exports = app => {
    const userController = require("../controllers/user.controller");

    const router = require("express").Router();

    // Create a new user
    router.post("/", userController.signup);


    app.use('/users', router);
};
  