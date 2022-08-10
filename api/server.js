const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({
     origin: '*'
}));

let books = [
    {id: 1, title: 'Java and spring'},
    {id: 2, title: 'C# and .netframework'},
    {id: 3, title: 'php and laravel'},
    {id: 4, title: 'node.js and express'},
    {id: 5, title: 'ios book'}
];

app.get('/api/books', (req, res) => {
    res.send({
        data: books
    });
});

app.post('/api/add/book', (req, res) => {
    books = books.concat({
        id: books.length +1,
        title: req.body.title
    })

    return res.send('Book has been added successfully');
})

const port = process.env.port || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));