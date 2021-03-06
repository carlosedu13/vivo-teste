const request = require('supertest');

const app = require('../src/server');

describe('Testing API Function', () => {
    it('should be with correct output', async () => {
        const body = 
        {
            'executionPeriod': {
                'start': '2019-11-10 09:00:00',
                'done': '2019-11-11 12:00:00'
            },
            'data': [
            {
                'id': 1,
                'description': 'Importação de arquivos de fundos',
                'maximumDate': '2019-11-10 12:00:00',
                'estimatedTime': '2 hours',
            },
            {
                'id': 2,
                'description': 'Importação de dados da Base Legada',
                'maximumDate': '2019-11-11 12:00:00',
                'estimatedTime': '4 hours',
            },
            {
                'id': 3,
                'description': 'Importação de dados de integração',
                'maximumDate': '2019-11-11 08:00:00',
                'estimatedTime': '6 hours',
            },
        ]};

        const response = await request(app)
            .post('/createjob')
            .send(body);

        const expected = [
            [1, 3],
            [2]
        ];

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(expected);
    })
})