module.exports = function (sequelize, Sequelize) {
  return sequelize.define('Users', {
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
};
