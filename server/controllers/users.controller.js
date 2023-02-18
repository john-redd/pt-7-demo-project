const sequelize = require('../db/connection')

async function createUsers(req, res){
  const { email, password } = req.body;

  const newUser = {
    email,
    password,
  };

  const [result, metadata] = await sequelize.query(`
      insert into users (
        email,
        password
      ) values (
        '${newUser.email}',
        '${newUser.password}'
      ) returning *;
    `)

  const user = result[0]

  delete user.password;

  res.status(201).send(user);
}

module.exports = {
  createUsers
}

