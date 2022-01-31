const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { users } = require("../db");
const bcrypt = require("bcrypt");

router.post(
    "/signup",
    [
        check("email", "Please provide a valid email").isEmail(),
        check("password", "Password should be greater than 7 characters").isLength({
            min: 7,
        }),
    ],
    async (req, res) => {
        const { email, password } = req.body;

        // Validates the input:
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({
                errors: errors.array(),
            });
        }

        // Validate if user doesn't already exist:
        let user = users.find((user) => {
            return user.email === email;
        });

        if (user) {
            res.status(400).json({
                errors: [
                    {
                        message: "This user already exists!",
                    },
                ],
            });
        }

        // Hash password:
        let hashPassword = await bcrypt.hash(password, 10);

        users.push({
            email,
            password: hashPassword,
        });

        res.send("Validation Passed!");
    },
);

router.get("/all", (req, res) => {
    res.json(users);
});

module.exports = router;
