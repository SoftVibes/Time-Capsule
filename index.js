const fs = require('fs');
const express = require('express');
const app = express();

PORT = 8080;
START = 2022;

app.use(express.json());

app.listen(PORT, () => {
    console.log('Online!');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
});

app.get('/css', (req, res) => {
    res.sendFile(__dirname + '/src/style.css');
});

app.get('/js', (req, res) => {
    res.sendFile(__dirname + '/src/script.js');
});

app.post('/new/:date', (req, res) => {
    const date = parseInt(req.params.date);
    const { email, msg, nickname } = req.body;

    if (!email || !msg) {
        res.send({
            code: 1,
            message: 'Missing authenticated email and/or message'
        });
    } else if ((date - START) % 2 == 0) {
        const data = JSON.parse(fs.readFileSync(__dirname + `/data/${date}.json`));
        
        for (let i = 0; i < data.length; i++) {
            if (data[i].email == email) {
                res.send({
                    code: 0,
                    message: 'Already accepted contribution from the user.'
                });
            }
        }
    } else {
        res.send({
            code: 0,
            message: 'Not accepting contributions this year'
        });
    }
});