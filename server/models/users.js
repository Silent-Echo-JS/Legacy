module.exports = function (sequelize, Sequelize) {
  const Users = sequelize.define('user', {
    userId: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    username: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false },
    business: { type: Sequelize.STRING },
  });
  return Users;
};
