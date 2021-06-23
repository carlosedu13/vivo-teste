const router = require('express').Router();

const manipulateArray = require('./lib/manipulateArray');
const cronjob = require('./lib/cronjob');

router.get('/ping', (request, response) => {
    response.status(200).send({'status': 'every pong here'})
});

router.post('/createjob', async (request, response) => {
    

    response.status(200).send();
});

module.exports = router;