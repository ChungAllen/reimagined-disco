const express = require('express');
const app = express();

app.use(express.json());

const books = [
    {id: 1, title: 'Java and spring'},
    {id: 2, title: 'C# and .netframework'},
    {id: 3, title: 'php and laravel'},
    {id: 4, title: 'node.js and express'}
];

app.get('/api/books', (req, res) => {
    res.send(books);
});

const port = process.env.port || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));