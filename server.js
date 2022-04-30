var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose"),
    ToDosController = require("./controllers/todos_controller"),
    UsersController = require("./controllers/users_controller"),
    app = express();

http.createServer(app).listen(3000);

app.use('/', express.static(__dirname + "/client"));
app.use('/user/:username', express.static(__dirname + "/client"));

// командуем Express принять поступающие объекты JSON
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/amazeriffic', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
     console.log("Connected to MongoDB")
}).catch(err => {
     console.log(Error, err.message);
});

app.get("/todos.json", ToDosController.index);
app.get("/todos/:id", ToDosController.show);
app.post("/todos", ToDosController.create);
app.put("/todos/:id", ToDosController.update);
app.delete("/todos/:id", ToDosController.destroy);

app.get("/user/:username/todos.json", ToDosController.index);
app.post("/user/:username/todos", ToDosController.create);
app.put("/user/:username/todos/:id", ToDosController.update);
app.delete("/user/:username/todos/:id", ToDosController.destroy);