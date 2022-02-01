const express = require("express");
const auth = require("./routes/auth");
const post = require("./routes/post");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/auth", auth);
app.use("/posts", post);

app.get("/", (req, res) => {
    res.send("Running Express App...");
});

app.listen("8000", () => {
    console.log("Running Express App...");
});
