var express = require("express"),
http = require("http"),
mongoose = require("mongoose"),
app = express();

app.use(express.static(__dirname + "/client"));
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
var ToDoSchema = mongoose.Schema({
    description: String,
    tags: [ String ]
});
var ToDo = mongoose.model("ToDo", ToDoSchema);
app.get("/todos.json", function(req, res) {
    ToDo.find({}, function(err, toDos) {
        res.json(toDos);
    });
});
http.createServer(app).listen(3000);
app.post("/todos", function(req, res) {
    console.log(req.body);
    var newToDo = new ToDo({"description":req.body.description, "tags":req.body.tags});
    newToDo.save(function(err, result) {
        if (err !== null) {
            console.log(err);
            res.send("ERRROR");
        } else {
            //клиент ожидает, что будут возвращены все задачи, поэтому для сохранения совместимости сделаем доп запрос
            ToDo.find({}, function(err, result) {
                if (err !== null) {
                    //элемент не был сохранен
                    res.send("Элемент не был сохранен");
                }
                res.json(result);
            });
        }
    });
});