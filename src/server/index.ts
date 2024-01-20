const express = require("express");
import bodyParser from "body-parser";

const cors = require("cors");
import { today, thisWeek, thisMonth } from "../posts";

const app = express();
app.use(cors());
app.use(bodyParser.json())

//@ts-ignore
app.get("/posts", (req, res) => {
  res.json([today, thisWeek, thisMonth]);
});

//@ts-ignore
app.post("/posts", (req, res) => {
  res.json([today, thisWeek, thisMonth]);
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
