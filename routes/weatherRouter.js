const express = require('express');
const router = express.Router();

const getWeather = require('../lib/getWeather');

router.get('/', (req, res) => {
    res.render('weather');
});
router.post('/', async(req, res) => {
    let location = req.body.location;
    let countryCode = req.body.countryCode;
    let query = req.body.query;

    let data = await getWeather(location, countryCode, query);
    if (data.cod == '404') {
        res.render('weather', {
            err:'The provided location doesn\'t exist'
        });
        return; 
    }
    res.render('weather', {
        data,
        listExists: true
    });
});

module.exports = router;