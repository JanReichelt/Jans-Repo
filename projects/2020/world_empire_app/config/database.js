const Sequelize = require('sequelize');
module.exports = new Sequelize('world_empire', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    // operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
