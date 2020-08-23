const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

// const config = {
//   "username": process.env.DB_USER,
//   "password": process.env.DB_PASSWORD,
//   "database": process.env.DB_NAME,
//   "host": process.env.DB_HOST,
//   "dialect": "mysql",
//   "timezone": "+09:00"
// }


const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./users')(sequelize,Sequelize);
db.Todo = require('./todo')(sequelize, Sequelize);

module.exports = db;