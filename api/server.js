const express = require('express')
const redis = require('redis')
var bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies


const client = redis.createClient({"host":"redis"});
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
            'text': req.body.text,
            'date': req.body.date,
            'done': req.body.done
        });
        client.sadd('todos', id)
        allTodos(res);
    });
});

app.post('/todos/update', (req, res) => {
    client.hmset(`todo:${req.body.id}`, {
        'text': req.body.text,
        'date': req.body.date,
        'done': req.body.done
    }, (err, reply)=> {
        allTodos(res);
    });
});

app.get('/todos/delete/:id', (req, res)=>{
    client.hdel(`todo:${req.params.id}`, ['text', 'date', 'done'], (err, reply) => {
        client.srem('todos',req.params.id, (err, reply) => {
            allTodos(res);
        })
    });
});




app.listen(port, () => console.log(`Listening on port :  ${port}!`))


function allTodos(res) {
    let todos = [];
    client.smembers('todos', (err, reply) => {
        reply.map((val, index, arr) => {
            client.hmget(`todo:${val}`, ['text', 'date', 'done'], (err, todo) => {
                todos.push({
                    id: val,
                    text: todo[0],
                    date: todo[1],
                    done: todo[2],
                })
                if (arr.length - 1 == index)
                    res.send(todos)
            })
        })
    })
}