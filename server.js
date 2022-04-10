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