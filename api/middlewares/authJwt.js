const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

module.exports = {
    verifyToken_Admin : (req, res, next) => {
      let token = req.headers.authorization;

      if (!token) {
        return res.status(403).send({ message: "No token provided!" });
      }
      
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Unauthorized!" });
        } else if (! decoded.isAdmin) {
          return res.status(403).send({ message: "Require Admin Role!" });
        }
        req.user_id = decoded.id;
        req.isAdmin = decoded.isAdmin;
        next();
      });
    },

    verifyToken_User : (req, res, next) => {
        let token = req.headers.authorization

        if (!token) {
          return res.status(403).send({ message: "No token provided!" });
        }
        jwt.verify(token, config.secret, (err, decoded) => {
          if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
          }
          req.user_id = decoded.id;
          next();
        });
    }
    
};