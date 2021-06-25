const router = require('express').Router();

const manipulateArray = require('./lib/manipulateArray');
const cronjob = require('./lib/cronjob');

router.get('/ping', (request, response) => {
    response.status(200).send({'status': 'every pong here'})
});

router.post('/createjob', (request, response) => {
    const data = manipulateArray(request.body);

    cronjob(data, request.body);

    response.status(200).send(data);
});

module.exports = router;