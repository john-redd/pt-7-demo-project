require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { PORT, DB_CONNECTION_URL } = process.env;
const usersCtrl = require('./controllers/users.controller')
const postsCtrl = require('./controllers/posts.controller')


app.use(express.json());
app.use(cors());

app.post("/api/users", usersCtrl.createUsers);

app.post("/api/posts", postsCtrl.createPost);
app.get('/api/posts', postsCtrl.getPosts);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
