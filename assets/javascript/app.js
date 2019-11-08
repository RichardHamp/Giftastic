$(document).ready(function() {
    console.log( "ready to search dem animalz!" );
  

var animalArray = ["naked mole rat", "mantis shrimp", "vampire squid", "orchid mantis",];

var queryURL = "https://api.giphy.com/v1/gifs/search?q="

var apiKey = "&api_key=Rxfl45R7o45YqIKgQLTGgQ6sYL4inFjm";

function makeButtons(){
    for (var i=0; i<animalArray.length; i++) {
        var but = $('<button class=buttons>'+(animalArray[i])+'</button>').click(function () {
            console.log('hi');
            $.ajax({
                url: (queryURL)+(animalArray[i])+(apiKey),
                method: "GET",
            }).then(function(response) {
                console.log(response);
            });
        });
        $("#aButton").append(but);
    }
}
makeButtons();

$("#aSubmit").click(function(event){
    event.preventDefault();
    var animal=$("#aSearch").val();
    animalArray.push(animal);
    console.log(animalArray);
});

});
