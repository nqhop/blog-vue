const express = require("express");
const cors = require("cors");
import { today, thisMonth, thisWeek } from "../posts";

const app = express();
app.use(cors());

//@ts-ignore
app.get("/posts", (req, res) => {
    res.json([today, thisWeek, thisMonth]);
});

app.listen(8000, () => {
    console.log("Listening on port 8000");
});
