const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
import { today, thisWeek, thisMonth, Post } from "../posts";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const allPosts = [today, thisWeek, thisMonth];
//@ts-ignore
app.get("/posts", (req, res) => {
  res.json(allPosts);
});

//@ts-ignore
app.post<{}, {}, Post>("/posts", (req, res) => {
  const post = { ...req.body, id: (Math.random() * 100000).toFixed() };
  console.log("from server: id of new post is: " + post.id);
  allPosts.push(post);
  res.json(post);
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
