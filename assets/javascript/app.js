$(document).ready(function () {

    //global variables
    var animalArray = ["Climate Change Denial", "Anti-Vax", "Roswell", "Vaccines Cause Autism", "Fluoridation Plot", "Faked Moon Landing", "New World Order", "Denver Airport Conspiracy", "Chemtrails", "Ancient Aliens", "Illuminati",];
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="
    var apiKey = "&api_key=Rxfl45R7o45YqIKgQLTGgQ6sYL4inFjm&limit=10";

    //goes through var animalArray and makes a button for each value.
    function makeButtons() {
        $("#aButton").empty();
        for (var i = 0; i < animalArray.length; i++) {
            var but = $('<button class="buttons glow-on-hover">' + (animalArray[i]) + '</button>');
            but.addClass("animalButton");
            but.attr("data", animalArray[i]);
            $("#aButton").append(but);
        }
    }

    //calls function for inital array of buttons
    makeButtons();

    //puts search element into button array above
    $("#aSubmit").click(function (event) {
        event.preventDefault();
        var animal = $("#aSearch").val();
        animalArray.push(animal);
        makeButtons();
    });

    //pulls gifs from Giphy
    $(document).on("click", ".animalButton", function () {
        $.ajax({

//PROBLEM BELOW HERE!!!
            url: (queryURL) + ("Vaccines Cause Autism") + (apiKey),
//PROBLEM ABOVE HERE!!!

            method: "GET",
        }).then(function (response) {
            results = response.data;
            for (var i = 0; i < results.length; i++) {
                //local variables for gifs
                var gifDiv = $("<div class='gifs'>");
                var gRating = results[i].rating;
                var p = $("<p>").text("Rating: " + gRating);
                var animalImage = $("<img>");
                animalImage.addClass("gif");
                animalImage.attr("src", results[i].images.fixed_height.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
//BUGS! BUGS! BUGS!
                animalImage.attr("data-state", "still");
//BUGS! BUGS! BUGS
                gifDiv.prepend(p);
                gifDiv.prepend(animalImage);
                $("#aGifs").prepend(gifDiv);
            };


            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");
                console.log(this);

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    });
});
