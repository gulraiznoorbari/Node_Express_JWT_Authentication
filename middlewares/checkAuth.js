const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(400).json({
            errors: [
                {
                    message: "No token found.",
                },
            ],
        });
    }
    try {
        let user = await jwt.verify(token, "jdfkbvgjdkbhjfbgdkjsbgi");
        req.user = user.email;
        next();
    } catch (error) {
        return res.status(400).json({
            errors: [
                {
                    message: "Token invalid.",
                },
            ],
        });
    }
};
