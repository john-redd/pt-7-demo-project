require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(cors());

const users = [];
let nextAvailableUserID = users.length + 1;

const posts = [];
let nextAvailablePostID = posts.length + 1;

app.post("/api/users", (req, res) => {
  const { email, password } = req.body;

  const newUser = {
    id: nextAvailableUserID,
    email,
    password,
  };

  nextAvailableUserID++;

  users.push(newUser);

  delete newUser.password;

  res.status(201).send(newUser);
});

app.post("/api/posts", (req, res) => {
  const { title, body, imgURL, userID } = req.body;

  const newPost = {

    id: nextAvailablePostID,
    title,
    body,
    imgURL,
    userID
  };

  posts.push(newPost);

  nextAvailablePostID++;

  res.status(201).send(newPost);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
