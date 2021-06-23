const request = require('supertest');

const app = require('../src/server');

// janela de execução 2019-11-10 09:00:00 até 2019-11-11 12:00:00

describe('Testing API Function', () => {
    it('should be with correct output', async () => {
        const data = [
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
        ];

        const response = await request(app)
            .post('/createJob')
            .send(data);

        const expected = [
            [1, 3],
            [2]
        ];

        expect(response.status).toBe(200);
        expect(response.body).toBe(expected);
    })
})