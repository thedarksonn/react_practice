
import jwt from 'jsonwebtoken'

export const checkAuth = async (req, res, next) => {
    let token = req.header("authorization")

    if (!token) {
        return res.status(403).json({
            errors: [
                {
                    msg: "unathorized"
                }
            ]
        })
    }


    token = token.split(" ")[1];
    try {
        const user = await jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.user = user.email
        next()

    } catch (error) {
        return res.status(403).json({
            errors: [
                {
                    msg: "unathorized1"
                }
            ]
        })
    }

    // res.send(token)
}