const sequelize = require("../db/connection");

async function createPost(req, res) {
  const { title, body, imgURL, userID } = req.body;

  const newPost = {
    title,
    body,
    imgURL,
    userID,
  };

  const [result, metadata] = await sequelize.query(`
      insert into posts (
        title,
        body,
        img_url,
        user_id
      ) values (
        '${newPost.title}',
        '${newPost.body}',
        ${newPost.imgURL ? `'${newPost.imgURL}'` : null},
        ${newPost.userID}
      ) returning *;
    `);

  console.log({ result, metadata });

  res.status(201).send(result);
}

async function getPosts(req, res) {
  // Callback
  // sequelize.query(`
  //     select
  //       *
  //     from posts p
  //     join users u on p.user_id = u.id;
  //   `).then(([result, metadata]) => {
  //     res.status(200).send(result);
  //   }).catch(err => {
  //     res.sendStatus(500)
  //   });


  // Async/Await
  try {
    const [result, metadata] = await sequelize.query(`
        select
          p.id,
          p.title,
          p.body,
          p.img_url,
          u.email
        from posts p
        join users u on p.user_id = u.id;
      `)

    res.status(200).send(result.map(d => {
      return {
        id: d.id,
        title: d.title,
        body: d.body,
        imgURL: d.img_url,
        email: d.email,
      }
    }));
  } catch (error) {
    res.sendStatus(500)
  }
}

module.exports = {
  createPost,
  getPosts,
};
