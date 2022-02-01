const router = require("express").Router();
const { publicContent, privateContent } = require("../db");
const checkAuth = require("../middlewares/checkAuth");

router.get("/public", (req, res) => {
    res.json({ publicContent });
});

router.get("/private", checkAuth, (req, res) => {
    res.json({ privateContent });
});

module.exports = router;
