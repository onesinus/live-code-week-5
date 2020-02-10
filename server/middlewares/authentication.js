const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
    try {
        console.log("masuk mari");
        const user = jwt.verify(req.get("access_token"), process.env.JWT_KEY);
        req.user = user;
        next();    
    } catch (error) {
        // console.log(error);
        res.status(403).json("Un-authorized");
    }
}

module.exports = authentication