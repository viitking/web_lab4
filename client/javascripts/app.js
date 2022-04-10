var organizeByTags = function (toDoObjects) {
    var tags = [];
    // перебираем все задачи toDos
    toDoObjects.forEach(function (toDo) {
        // перебираем все теги для каждой задачи
        toDo.tags.forEach(function (tag) {
            // проверка на наличие тега в массиве
            if (tags.indexOf(tag) === -1) {
                tags.push(tag);
            }
        });
    });
    console.log(tags);
    var tagObjects = tags.map(function (tag) {
        // поиск задач, содержащих этот тег
        var toDosWithTag = [];
        toDoObjects.forEach(function (toDo) {
            if (toDo.tags.indexOf(tag) !== -1) {
                toDosWithTag.push(toDo.description);
            }
        });
        // связываем каждый тег с объектом, который содержит
        // название тега и массив
        return { "name": tag, "toDos": toDosWithTag };
    });
    console.log(tagObjects);
    return tagObjects;
}

var main = function (toDoObjects) {
    "use strict";
    var toDos = toDoObjects.map(function (toDo) {
        return toDo.description;
    });

    $(".tabs a span").toArray().forEach(function (element) {
        $(element).on("click", function () {
            var $element = $(element), $content;
            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                $content = $("<ul>");
                for (var i = toDos.length; i > -1; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(2)")) {
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(3)")) {
                console.log("Щелчок на вкладке Теги");
                var organizedByTag = organizeByTags(toDoObjects);
				
				 organizedByTag.forEach(function (tag) { 
					var $tagName = $("<h3>").text(tag.name), 
					$content = $("<ul>"); 
					tag.toDos.forEach(function (description) { 
						var $li = $("<li>").text(description); 
						$content.append($li); 
					});
                    $("main .content").append($tagName);
                    $("main .content").append($content);					
				});
            } else if ($element.parent().is(":nth-child(4)")) {
                var $input = $("<input>").addClass("description"),
                $inputLabel = $("<p>").text("Новая задача:"),
                $tagInput = $("<input>").addClass("tags"),
                $tagLabel = $("<p>").text("Тэги: "),
                $button = $("<button>").text("+");
                var addTaskFromInput = function () {
                    var description = $input.val();                    
                    //разделение по запятым
                    if (description !== "" && $tagInput.val() !== "") {
                        var tags = $tagInput.val().split(",");
                        // создаем новый элемент списка задач
                        var newToDo = {"description":description, "tags":tags};
                        // здесь мы отправляем быстрое сообщение на маршрут списка задач
                        $.post("todos", newToDo, function(result) {
                            console.log(result);
                            //нужно отправить новый объект на клиент после получения ответа сервера
                            toDoObjects.push(newToDo);
                        });
                        //обновление toDos
                        toDos = toDoObjects.map(function (toDo) {
                            return toDo.description;
                        });
                        $input.val("");
                        $tagInput.val("");
                        alert("Задача и тег добавлены!");
                    }
                    else { alert('Заполните поле ввода!'); }
                };
                $("main .content").append($inputLabel).append($input).append($tagLabel).append($tagInput).append($button);
                $button.on("click", function (event) {
                    addTaskFromInput();
                });
                $input.on("keypress", function (event) {
                    if (event.keyCode == 13) {
                        addTaskFromInput();
                    }
                })
                $tagInput.on("keypress", function (event) {
                    if (event.keyCode == 13) {
                        addTaskFromInput();
                    }
                })
            }
            else if ($element.parent().is(":nth-child(5)")) {
                if (document.scripts.length > 2) {
                    
                }
                var js = document.createElement('script');
                js.src = "javascripts/slideshow.js";
                js.id = "slideshowscript";
                document.body.appendChild(js);
                console.log(document.scripts);
            }
            return false;
        });
    });
    $(".tabs a:first-child span").trigger("click");
};
$(document).ready(function () {
    $.getJSON("todos.json", function (toDoObjects) {
        main(toDoObjects);
    });
});