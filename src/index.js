const express = require("express");
const databaseOperations = require("./databaseOperations");
const toDoListApp = require('./toDoListApp');
const bodyParser = require('body-parser');

// creating database
databaseOperations.createDatabase();
databaseOperations.createTable();

// server operations
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000,() => console.log("Server listening at port 3000"));

app.get("/", (req, res) => {
    res.send("ToDo App");
});

app.get("/getTasks", async (req, res) => {
    let result = await toDoListApp.getListOfTasks();
    res.send(result.rows);
});

app.post("/createTask", async (req, res) => {
    let reqJson = await JSON.parse(JSON.stringify(req.body));
    let result = await toDoListApp.createOrUpdateTask(reqJson);
    if(result){
        res.sendStatus(200);
    }
    else{
        res.sendStatus(500);
    }
});

app.post("/updateTask", async (req, res) => {
    let reqJson = await JSON.parse(JSON.stringify(req.body));
    let result = await toDoListApp.createOrUpdateTask(reqJson);
    if(result){
        res.sendStatus(200);
    }
    else{
        res.sendStatus(500);
    }
});

app.post("/deleteTask", async (req, res) => {
    let reqJson = await JSON.parse(JSON.stringify(req.body));
    let result = await toDoListApp.deleteTask(reqJson);
    if(result){
        res.sendStatus(200);
    }
    else{
        res.sendStatus(500);
    }
});

app.post("/markComplete", async (req, res) => {
    let reqJson = await JSON.parse(JSON.stringify(req.body));
    let result = await toDoListApp.markCompleteTask(reqJson);
    if(result){
        res.sendStatus(200);
    }
    else{
        res.sendStatus(500);
    }
});