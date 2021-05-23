const Sequelize = require('sequelize');

const sequelize = new Sequelize('db_recipes', 'root', 'thanh123!@#', {
    host:'localhost',
    dialect:'mysql'
});
module.exports = sequelize;