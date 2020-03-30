const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Country = require('../models/Country');

router.get('/', (req, res) => {
    Country.findAll()
        .then(countries => {
            // res.send(countries); //send the complete json in plain view
            res.render('map', {
                countries: countries
            });
        })
        .catch(err => console.log(err));
});

module.exports = router;
