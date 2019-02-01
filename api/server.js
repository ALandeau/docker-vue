const express = require('express')
const redis = require('redis')
var bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain)


const client = redis.createClient();
//Init logic just in case : 

client.get("currentId", function (err, reply) {
    if (reply == null) {
        client.set('currentId', 0);
    }
});


app.get('/todos', (req, res) => {
    allTodos(res);
})

app.post('/todos/save', (req, res) => {
    client.incr('currentId', function (err, id) {
        client.hmset(`todo:${id}`, {
            'name': req.body.name,
            'date': req.body.date,
            'completed': req.body.completed
        });
        client.sadd('todos', id)
        allTodos(res);
    });
});

app.post('/todos/update', (req, res) => {
    client.hmset(`todo:${req.body.id}`, {
        'name': req.body.name,
        'date': req.body.date,
        'completed': req.body.completed
    }, (err, reply)=> {
        allTodos(res);
    });
});

app.get('/todos/delete/:id', (req, res)=>{
    client.hdel(`todo:${req.params.id}`, ['name', 'date', 'completed'], (err, reply) => {
        client.srem('todos',req.params.id, (err, reply) => {
            allTodos(res);
        })
    });
});




app.listen(port, () => console.log(`Listening on port :  ${port}!`))


function allTodos(res) {
    let todos = [];
    client.smembers('todos', (err, reply) => {
        if(reply.length == 0)
            res.send([])
        reply.map((val, index, arr) => {
            client.hmget(`todo:${val}`, ['name', 'date', 'completed'], (err, todo) => {
                todos.push({
                    id: val,
                    name: todo[0],
                    date: todo[1],
                    completed: todo[2],
                })
                if (arr.length - 1 == index)
                    res.send(todos)
            })
        })
    })
}