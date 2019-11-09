$(document).ready(function () {

    //global variables
    var crazyArray = ["Climate Change Denial", "Anti-Vax", "Roswell", "Vaccines Cause Autism", "Faked Moon Landing", "Chemtrails", "Ancient Aliens", "Illuminati",];
   

    //goes through var crazyArray and makes a button for each value.
    function makeButtons() {
        $("#aButton").empty();
        for (var i = 0; i < crazyArray.length; i++) {
            var but = $('<button class="buttons glow-on-hover">' + (crazyArray[i]) + '</button>');
            but.addClass("crazyButton");
            but.attr("value", crazyArray[i]);
            $("#aButton").prepend(but);
        }
    }

    //calls function for inital array of buttons
    makeButtons();

    //puts search element into button array above
    $("#aSubmit").click(function (event) {
        
        event.preventDefault();
        var crazy = $("#aSearch").val();
        crazyArray.push(crazy);
        makeButtons();
    });

    //pulls gifs from Giphy
    $(document).on("click", ".crazyButton", function () {
    var work=this.value;
    console.log(work);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" 
    +work+"&api_key=Rxfl45R7o45YqIKgQLTGgQ6sYL4inFjm&limit=10"
        
        $("#aGifs").empty();
        console.log(queryURL);
        $.ajax({

//PROBLEM BELOW HERE!!!
            url: (queryURL),
//PROBLEM ABOVE HERE!!!

            method: "GET",
        }).then(function (response) {
            results = response.data;
            for (var i = 0; i < results.length; i++) {
                //local variables for gifs
                var gifDiv = $("<div class='gifs'>");
                var gRating = results[i].rating;
                var p = $("<p>").text("Rating: " + gRating);
                var crazyImage = $("<img>");
                crazyImage.addClass("gif");
                crazyImage.attr("src", results[i].images.fixed_height_still.url);
                crazyImage.attr("data-still", results[i].images.fixed_height_still.url);
                crazyImage.attr("data-animate", results[i].images.fixed_height.url);
                crazyImage.attr("data-state", "still");
                gifDiv.prepend(p);
                gifDiv.prepend(crazyImage);
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
