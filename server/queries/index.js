const cloudinary = require('cloudinary').v2;// api for dealing with image DB, cloudinary
const config = require('../config/cloudinary');
const { db, Users, Posts } = require('../models');

// IF TRYING TO FIND A USER, LOOK AT GETUSER BELOW, decide which to use!!!!!!!!
// Both find users, from the DB and take all the info from them, find users actually passes the info in the .catch, while get users from the .then
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
const findUser = (user) => new Promise((resolve, reject) => {
  // select user from database if exists
  const foundUser = `SELECT * FROM users where username= "${user}"`;

  db.sequelize.query(foundUser, [user], (err, results, fields) => {
    if (results.length > 0) {
      return reject(user);
    }
    return resolve(results);
  });
});

// same code as above, just reversed the reject and resolve for login
const getUser = (user) => new Promise((resolve, reject) => {
  // select user from database if exists
  const foundUser = `SELECT * FROM users where username= "${user}"`;

  db.sequelize.query(foundUser, [user], (err, results, fields) => {
    if (results.length > 0) {
      return resolve(results);
    }
    return reject(user);
  });
});

// saves the user into the DB
const saveUser = (user) => new Promise((resolve, reject) => {
  const userInsert = 'INSERT INTO users(userId, username, password, email, business) VALUES (DEFAULT, ?)';
  const insertValues = [user.username, user.password, user.email, user.business];

  db.sequelize.query(userInsert, [insertValues], (err, results, fields) => {
    if (err) {
      console.log(err);
      return reject(err);
    }
    return resolve(results, fields);
  });
});

// creates a running psts count into the DB
const saveUsersPostCount = (userId) => new Promise((resolve, reject) => {
  const countInsert = 'INSERT INTO postCount(count, userId) VALUES (DEFAULT, ?)';

  db.sequelize.query(countInsert, [userId], (err, results) => {
    if (err) {
      console.log(err);
      return reject(err);
    }
    return resolve(results);
  });
});
// saves posts to the DB
const savePost = (post) => new Promise((resolve, reject) => {
  const postInsert = 'INSERT INTO posts(postId, text, img1, title, location, tagList, lumber, metal, concrete, glass, piping, userId) VALUES (DEFAULT, ?)';
  const insertValues = [post.text, post.img1, post.title, post.location, post.tagList, post.lumber, post.metal, post.concrete, post.glass, post.piping, post.userId];

  db.sequelize.query(postInsert, [insertValues], (err, results) => {
    if (err) {
      console.log(err);
      return reject(err);
    }
    return resolve(results);
  });
});
// increasts the coiunt of posts in the DB
const increasePostCount = (userId) => new Promise((resolve, reject) => {
  const increaseInsert = 'UPDATE postCount SET count = count + 1 WHERE userId = ?';

  db.sequelize.query(increaseInsert, [userId], (err, results) => {
    if (err) {
      console.log(err);
      return reject(err);
    }
    return resolve(results);
  });
});

const displayPosts = () => new Promise((resolve, reject) => {
  const fetchedPosts = Posts.findAll({ include: [{ model: Users, required: true }] });
  db.sequelize.query(fetchedPosts, (err, results) => {
    if (err) {
      return reject(err);
    }
    return resolve(results);
  });
});


cloudinary.config(config);// config object for connecting to cloudinary

const saveImage = (image) => cloudinary.uploader.upload(image.tempFilePath);

// allows you to select all the posts based upon hat type of material you wish
const searchTags = (tag) => new Promise((resolve, reject) => {
  const searchedTag = `SELECT * FROM posts WHERE ${tag.material} IS TRUE`;
  db.sequelize.query(searchedTag, (err, results) => {
    if (err) {
      return reject(err);
    }
    return resolve(results);
  });
});
// grabs all the user info for each individual post
const getPostInfo = (userId) => new Promise((resolve, reject) => {
  const userIdInsert = 'SELECT users.username, users.email, users.business FROM users WHERE userId = ?';

  db.sequelize.query(userIdInsert, [userId], (err, results) => {
    if (err) {
      console.log(err);
      return reject(err);
    }
    return resolve(results);
  });
});

module.exports = {
  findUser,
  getUser,
  db,
  saveUser,
  savePost,
  increasePostCount,
  saveImage,
  saveUsersPostCount,
  displayPosts,
  searchTags,
  getPostInfo,
};
