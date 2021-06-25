# Scheduling Job

## No terminal execute

```sh
    yarn
    # ou
    npm i
    # após instalar as depêndecias inicie o projeto
    yarn start
    # ou
    npm start
```

## Rota GET para verificar resposta da aplicação: /ping
Não precisa de enviar nada no body
## Rota POST: /createjob

### Exemplo de Request para a rota /createjob

```json
{
    "executionPeriod": {
        "start": "2019-11-10 09:00:00",
        "done": "2019-11-11 12:00:00"
    },
    "data": [
    {
        "id": 1,
        "description": "Importação de arquivos de fundos",
        "maximumDate": "2019-11-10 12:00:00",
        "estimatedTime": "2 hours"
    },
    {
        "id": 2,
        "description": "Importação de dados da Base Legada",
        "maximumDate": "2019-11-11 12:00:00",
        "estimatedTime": "4 hours"
    },
    {
        "id": 3,
        "description": "Importação de dados de integração",
        "maximumDate": "2019-11-11 08:00:00",
        "estimatedTime": "6 hours"
    }
]}
```

### Exemplo de Response para a rota /createjob

```json
[
    [1, 3],
    [2]
]
```

### Qualquer outra rota retorna um erro 404
