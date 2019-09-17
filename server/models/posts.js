module.exports = function (sequelize, Sequelize) {
  const Posts = sequelize.define('post', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    img1: {
      type: Sequelize.TEXT,
      notEmpty: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.STRING,
    },
    tagList: {
      type: Sequelize.STRING,
    },
    lumber: {
      type: Sequelize.BOOLEAN,
    },
    metal: {
      type: Sequelize.BOOLEAN,
    },
    concrete: {
      type: Sequelize.BOOLEAN,
    },
    glass: {
      type: Sequelize.BOOLEAN,
    },
    piping: {
      type: Sequelize.BOOLEAN,
    },
    postNum: {
      type: Sequelize.INTEGER,
      default: 0,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        // This is a reference to another model
        model: 'Users',
        // This is the column name of the referenced model
        key: 'userId',
      },
    },
  });
  return Posts;
};
