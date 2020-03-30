const Sequelize = require('sequelize');
const db = require('../config/database');

const Country = db.define('country', {
    name: {
        type: Sequelize.STRING
    },
    short_code: {
        // Primary Key, alpha2Code
        type: Sequelize.STRING(2),
        allowNull: false
    },
    capital: {
        type: Sequelize.STRING
    },
    subregion: {
        type: Sequelize.STRING
    },
    population: {
        type: Sequelize.BIGINT
    },
    area: {
        type: Sequelize.BIGINT
    },
    borders: {
        type: Sequelize.STRING
    },
    native_name: {
        type: Sequelize.STRING
    },
    currencies: {
        type: Sequelize.STRING
    },
    languages: {
        type: Sequelize.STRING
    },
    translations: {
        type: Sequelize.STRING
    },
    flag_url: {
        type: Sequelize.STRING
    },
    fraction: {
        type: Sequelize.STRING
    },
    startland: {
        type: Sequelize.BOOLEAN
    },
    sympathy: {
        type: Sequelize.INTEGER
    },
    neighbors: {
        type: Sequelize.STRING
    },
    has_factory: {
        type: Sequelize.BOOLEAN
    },
    has_casern: {
        type: Sequelize.BOOLEAN
    },
    troops_in_training: {
        type: Sequelize.STRING
    },
    troops: {
        type: Sequelize.STRING
    },
    has_research_center: {
        type: Sequelize.BOOLEAN
    },
    research_perks: {
        type: Sequelize.STRING
    },
    money_current: {
        type: Sequelize.FLOAT
    },
    money_expense: {
        type: Sequelize.FLOAT
    },
    money_income: {
        type: Sequelize.FLOAT
    }
});
module.exports = Country;
