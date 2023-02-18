create table users (
  id serial primary key,
  email varchar(255) not null,
  password varchar(255) not null
);

create table posts (
  id serial primary key,
  title varchar(255) not null,
  body varchar(255) not null,
  img_url varchar(255),
  user_id int references users(id)
);
