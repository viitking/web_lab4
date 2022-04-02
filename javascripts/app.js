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
                console.log("Щелчок на вкладке ТЕГИ");
            } else if ($element.parent().is(":nth-child(4)")) {
                $(".content").append('<input type="text" class="input-task">' +
                '<button class="butt">+</button>' + '</input>');
                var newTask;
                var addTaskFromInput = function () {
                    newTask = $('.input-task').val();
                    if (newTask != '') {
                        toDos.push(newTask);
                        alert('Новое задание добавлено!');
                        $('.inp').val("");
                    }
                    else { alert('Заполните поле ввода!'); }
                };
                $('.butt').on("click", function (event) {
                    addTaskFromInput();
                });
                $('.input-task').on("keypress", function (event) {
                    if (event.keyCode == 13) {
                        addTaskFromInput();
                    }
                })
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