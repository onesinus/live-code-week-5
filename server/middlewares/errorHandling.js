function errorHandling(err, req, res, next) {
    try {
        const {statusCode, message} = err;
        res.status(statusCode).json(message);
        next();
    } catch (error) {
        res.status(500).json("Something went wrong");
    }
}

module.exports = errorHandling