var express = require('express'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    serveStatic = require('serve-static'),
    path = require('path'),
    port = 3000,
    stub = 'http://localhost:' + port,
    todos = require('./todos.json'),
    app = express(),
    id = todos.length;

app.use(bodyParser.urlencoded({extended: true, limit: '20mb'}));
app.use(bodyParser.json())
app.use(compression());
app.use(serveStatic(__dirname + '/dist'));

app.get('/api/todos', function (req, res) {
    res.json(todos);
});

app.post('/api/todos', function (req, res) {
    var todo = req.body;
    todo.id = (id++).toString();
    todos.push(todo);
    res.json(todo)
});

app.put('/api/todos/:id', function (req, res) {
    todos[Number(req.params.id)].is_completed = req.body.is_completed;
    todos[Number(req.params.id)].description = req.body.description;
    res.send(204);
});

app.delete('/api/todos/:id', function (req, res) {
    todos.splice(Number(req.params.id), 1);
    res.send(204);
});

app.get('*', function (req, res) { res.sendFile(path.join(__dirname + '/dist/index.html')); });

app.listen(port, function () { console.log('Mithril to do web server listening on port ' + port); });