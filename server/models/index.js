const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'mysql.json'))[env];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    sequelize[model.name] = model;
  });

Object.keys(sequelize).forEach((modelName) => {
  if ('associate' in sequelize[modelName]) {
    sequelize[modelName].associate(sequelize);
  }
});

sequelize.Sequelize = Sequelize;

module.exports = sequelize;
