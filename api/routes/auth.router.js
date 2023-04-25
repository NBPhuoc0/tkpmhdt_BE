const router = require("express").Router();
const userController = require("../controllers/user.controller");
const verifySignUp = require("../middlewares/verifySignUp");

module.exports = (app) => {

    // sign up
    router.post("/signup",[verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.registerValidator], userController.signup);

    // sign in
    router.post("/signin", userController.signin);

    app.use('/auth', router);
}
