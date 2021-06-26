const router = require('express').Router();

const manipulateArray = require('./lib/manipulateArray');
const cronjob = require('./lib/cronjob');

router.get('/ping', (request, response) => {
    response.status(200).send({'status': 'every pong here'})
});

router.post('/createjob', (request, response) => {
    try {
        const data = manipulateArray(request.body);

        cronjob(data, request.body);

        response.status(200).send(data);
    } catch (err) {
        response.status(500).send({'message': 'Internal Server Error'});
    }
});

module.exports = router;