var express = require("express"),
http = require("http"),
app = express(),
toDos = [
    {
        "description": "Купить продукты",
        "tags": ["Шопинг", "Рутина"]
    },
    {
        "description": "Сделать несколько новых задач",
        "tags": ["Писательство", "Работа"]   
    },
    {
        "description": "Подготовиться к лекции в понедельник",
        "tags": ["Работа", "Преподавание"]  
    },
    {
        "description": "Ответить на электронные письма",
        "tags": ["Работа"]  
    },
    {
        "description": "Вывести Грейси на прогулку в парк",
        "tags": ["Рутина", "Питомцы"]  
    },
    {
        "description": "Закончить писать книгу",
        "tags": ["Писательство", "Работа"]  
    }
];

app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(3000);
app.get("/todos.json", function(req, res) {
    res.json(toDos);
});
// командуем Express принять поступающие объекты JSON
app.use(express.urlencoded({ extended: true }));
app.post("/todos", function(req, res) {
    // сейчас объект сохраняется в req.body
    var newToDo = req.body;
    console.log(newToDo);
    toDos.push(newToDo);
    console.log("Данные были отправлены на сервер!");
    res.json({"message":"Вы размещаетесь на сервере!"});
})