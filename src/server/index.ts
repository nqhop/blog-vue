const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
import { today, thisMonth, thisWeek, Post } from "../posts";

const app = express();
app.use(cors());
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}))

const allPosts = [today, thisWeek, thisMonth];

//@ts-ignore
app.get("/posts", (req, res) => {
    res.json(allPosts);
});

//@ts-ignore
app.post<{}, {}, Post>("/posts", (req, res) => {
    const post = {...req.body, id: (Math.random() * 100000).toFixed()}
    allPosts.push(post);
    res.json(post);
});

app.listen(8000, () => {
    console.log("Listening on port 8000");
});
