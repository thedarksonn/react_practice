const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    try {
        // get token from header
        const token = req.header("authorization").split(" ")[1];
        const descryptedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        req.body.userId = descryptedToken.userId
        next()
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }

}