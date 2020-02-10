"use strict"

const jwt   = require('jsonwebtoken');
const User  = require('../models').User;

class UsersControllers {
    static login(req, res ,next) {
        const {email, password} = req.body;

        User.findOne({
            where: {email, password}
        })
        .then(user => {
            if (user) {                
                const access_token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY);
                res.status(200).json({access_token});
            }else{
                throw {
                    statusCode: 404,
                    message: "Invalid username or password!"
                }
            }
        })
        .catch(err => {
            next(err);
        });
    }

    static register(req, res, next) {
        const {name, email, password} = req.body;
        User
            .create({
                name, email, password
            })
            .then(resUser => {
                let user = resUser.dataValues;
                const access_token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY);
                res.status(201).json({access_token});
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = UsersControllers;