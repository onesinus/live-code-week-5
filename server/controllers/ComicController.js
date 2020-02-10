"use strict"

const Comic = require('../models').Comic;

class ComicController {
    static list(req, res, next) {
        Comic
            .findAll()        
            .then(comics => {
                res.status(200).json(comics);
            })
            .catch(err => {
                next(err);
            })
    }

    static update(req, res, next) {
        const {title, author, imgUrl}  = req.body;
        Comic
            .update({
                title, author, imageUrl: imgUrl
            },
            {
                where: {
                    id: 1
                },
                returning: true
            })
            .then(updatedComic => {
                res.status(200).json({
                    comic: updatedComic[1][0],
                    message: "success update comic"
                });
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = ComicController