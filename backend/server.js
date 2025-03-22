const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let products = [
    { id: 1, name: 'Alguidar Nº 00000', price: 7.00 },
    { id: 2, name: 'Alguidar Nº 0000', price: 8.00 },
    // Adicione mais produtos aqui
];

app.get('/products', (req, res) => {
    res.json(products);
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});