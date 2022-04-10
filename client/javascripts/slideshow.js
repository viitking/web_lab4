var slideshow = function(tag) {
    var id;
    var url = "http://api.flickr.com/services/feeds/photos_public.gne?" + "tags=" + tag + "&format=json&jsoncallback=?";
    var displayMessage = function(messageIndex) {
        if (tag != "") {
            $.getJSON(url, function(flickrResponse) {
                console.log(messageIndex);
                var $img = $("<img>").attr("src", flickrResponse.items[messageIndex].media.m).hide();
                $("main .photos").empty();
                $("main .photos").append($img);
                $img.fadeIn();
                id = setTimeout(function () {
                    messageIndex = messageIndex + 1;
                    displayMessage(messageIndex);
                }, 3000);
                if (messageIndex === 5) {
                    messageIndex = -1;
                }
            });
        }
    };
    displayMessage(0);
}

var main = function () {
    "use strict";
    var tag = "";
    var $inputLabel = $("<p>").text("Введите тег для темы слайд-шоу: "),
    $input = $("<input>").addClass("tag"), $button = $("<button>").text("Поиск");
    var $photos = $("<div>").addClass("photos");
    $button.on("click", function () {
        var tag = "";
        tag = $input.val();
        $input.val("");
        if (tag !== "") {
            $("main .photos").empty();
            $("main .content").append($photos);
            slideshow(tag);
        }        
    });
    $("main .content").append($inputLabel).append($input).append($button);
};
$(document).ready(main);