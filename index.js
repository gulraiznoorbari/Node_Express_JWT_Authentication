const express = require("express");
const auth = require("./routes/auth");

const app = express();

app.use(express.json());

app.use("/auth", auth);

app.get("/", (req, res) => {
    res.send("Running Express App...");
});

app.listen("8000", () => {
    console.log("Running Express App...");
});
