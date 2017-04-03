
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA_fu2UaPSlieTOLsBfHF0RnqUYrJVS1WE",
    authDomain: "what-to-watch-db8c3.firebaseapp.com",
    databaseURL: "https://what-to-watch-db8c3.firebaseio.com",
    storageBucket: "what-to-watch-db8c3.appspot.com",
    messagingSenderId: "286455706703"
  };
  firebase.initializeApp(config);




  /*  ------------------------Code goes here---------------------------------------------*/

 /*  -----------------------Indico API Code here------------------------------*/



var genre;
var keywordArray = []
  // three images of user favorite things
  var threeImg = [];
  /*User photo from web cam.
  *******In order to get user photo need to start page on server. 
  ********(Have no idea why browser doesn't want to give access to web-cam if you start index page localy)*/
  var avatar;

  // paragraph describing either user life, day, or current mood.
  var paragraph;

  var imgId = 0;

var test = {
    'anger': 0.007581704296171665,
    'joy': 0.07016665488481522,
    'fear': 0.8000516295433044,
    'sadness': 0.02512381225824356,
    'surprise': 0.06534374748375202
}

  //Converts emotion spectrum into  a genre
  function emoteGenre(input){
    if (input.anger >.5){
      return "war"
    }
    if (input.joy > .5){
      return "animation"
    }
    if (input.fear > .5){
      return "thriller"
    }
    if (input.sadness > .5){
      return "comedy"
    }
    if (input.surpirse > .5){
      return "mystery"
    }
    if (input.anger > .25 && input.surprise >.25 ){
      return "crime"
    }
    if (input.joy > .25 && input.surprise >.25 ){
      return "action"
    }
    if (input.fear > .25 && input.surprise >.25 ){
      return "horror"
    }
    if (input.sadness > .25 && input.surprise >.25 ){
      return "fantasy"
    }
    if (input.anger > .25 && input.joy >.25 ){
      return "adventure"
    }
    if (input.anger > .25 && input.fear >.25 ){
      return "western"
    }
    if (input.anger > .25 && input.joy >.25 ){
      return "adventure"
    }
    if (input.joy > .25 && input.fear >.25 ){
      return "romance"
    }
    if (input.sadness > .25 && input.fear >.25 ){
      return "drama"
    }
    if (input.anger > .25 && input.sadness >.25 ){
      return "music"
    }
    else{
      return "tv movie"
    }
  }

  // Get image fron user 
  function getImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = addPicToPage;
        reader.readAsDataURL(input.files[0]);
        
        var indico = require('indico.io');
            indico.apiKey =  '7757e7fda1d6a89efbd1cc07880cc78f';

            var response = function(res) { console.log(res); }
            var logError = function(err) { console.log(err); }
  
                // single example
                indico.facialFeatures("<IMAGE>")
                  //takes data from image and converts into a genre
                    .done(genre = emoteGenre(response))
                    .catch(logError);
      }
  }

  //Add user image to the page and push this image to threeImg array  
  function addPicToPage(img){
    
    threeImg.push({id:imgId, img:img.target.result});
    var $imgSquare = $('<div class="images"></div');
    var $remove =$('<a class ="del_img btn btn-primary btn-circle btn-xl" data-id ="'+imgId+'"><i class="glyphicon glyphicon-remove"></i></a>')
    var $image = $('<img>')
      $image.attr('src', img.target.result)
      .width(150)
      .height(200);
      $('#img-block').append($imgSquare.append($image).append($remove));
      $imgSquare.hide().fadeIn("slow");

    if (threeImg.length === 3) {
      $('#picture-uploader').prop("disabled", true);
    }
    imgId++;
    //
    $('.del_img').on("click",function(){
      var id = $(this).data('id');
      $(this).closest('.images').remove();
      threeImg = threeImg.filter(function(element){
        return element.id !== id;
      })
      $('#picture-uploader').prop("disabled", false);
   

      for (var i = 0; threeImg.length > i; i++){
        $.post(
          'https://apiv2.indico.io/imagerecognition',
          JSON.stringify({
            'api_key': "7757e7fda1d6a89efbd1cc07880cc78f",
            'data': "<IMAGE>",
            'threshold': 0.01
          })
        ).then(keywordArray.push(Object.keys(response)[0]);
      }
      });
  }
  //Get user input from paragraph element
  $('#submitParagraph').click(function(e){
    e.preventDefault;
    var $parElement = $('#paragraph');
    paragraph = $parElement.val();
    $parElement.prop("disabled", true);
    $(this).prop("disabled", true);
   
    var indico = require('indico.io');
        indico.apiKey =  '7757e7fda1d6a89efbd1cc07880cc78f';

        var response = function(res) { console.log(res); }
        var logError = function(err) { console.log(err); }


        var textBatchInput = [
    "I did it. I got into Grad School. Not just any program, but a GREAT program. :-)",
    "Like seriously my life is bleak, I have been unemployed for almost a year."
        ];
        indico.emotion(batchInput)
          //pushes all keywords to keyword array
          .then(keywordArray.push(Object.keys(response)))
          .catch(logError);

  });90

$("#getMovies").click(function(){
  textbatchInput.push(paragraph);
  imagebatchInput.push(threeImg);
  webcamBatchInput.push(avatar);
})


//console.log(textbatchInput);
//console.log(imagebatchInput);
//console.log(webcamBatchInput);




 /*  -----------------------TheMovieDB Code Here------------------------------*/
//https://api.themoviedb.org/3/movie/76341?api_key={4eea97057056c04b2e278ac4baa59a43}
//var list
//Create Genre Array
var genreArray = [{ "id": 28, "name": "Action"}, { "id": 12, "name": "Adventure"}, {"id": 16,"name": "Animation"}, {"id": 35, "name": "Comedy"},{"id": 80,"name": "Crime"},{"id": 99,"name": "Documentary"},{"id": 18, "name": "Drama"},{"id": 10751,"name": "Family"},{"id": 14,"name": "Fantasy"},{"id": 36,"name": "History"},{"id": 27,"name": "Horror"},{"id": 10402,"name": "Music"},{"id": 9648,"name": "Mystery"},{"id": 10749,"name": "Romance"},{"id": 878,"name": "Science Fiction"},{"id": 10770,"name": "TV Movie"},{"id": 53,"name": "Thriller"},{"id": 10752,"name": "War"},{"id": 37,"name": "Western"}]
var movieArray = [];
var searchingMovieArray = [];
var keywordArray = ["Basketball", "Dog", "cats"]

genre = genre.toLowerCase();
var genreId = 0;

//func list
//Look into error later


//Look into Success > Complete Ajax commands

//Add genre to search query
function genreFinder(){
  genreArray.forEach(function(nameG){
    if (genre === nameG.name.toLowerCase()){
      genreId = nameG.id;
    }
  })
};
genreFinder();

//Find keywords Id numbers
function idKeyword(){
  var keywordURL;
  var settings;

  for (var i=0; i < keywordArray.length; i++){
      keywordURL = "https://api.themoviedb.org/3/search/keyword?api_key=4eea97057056c04b2e278ac4baa59a43&query=" + keywordArray[i] + "&page=1"
      settings = {
        "async": true,
        "crossDomain": true,
        "url": keywordURL,
        "method": "GET",
        "headers": {},
        "data": "{}", 
        }

      $.ajax(settings).done(function (response) {
        //pull first keyword id number from array
        var thisKeywordId = response.results[0].id;
        var movieIdURL;
        var settings;

        //search for movies with proper keyword and genre
        movieIdURL = "https://api.themoviedb.org/3/discover/movie?api_key=4eea97057056c04b2e278ac4baa59a43&language=en-US&sort_by=popularity.desc&page=1&vote_average.gte=6.5&with_genres=" + genreId + "&with_keywords=" + thisKeywordId
          
          settings = {
            "url": movieIdURL,
          }
          //Pull films from each query and push their Ids to a new array
          $.ajax(settings).done(function (response) {
            console.log(response);
            if (response.total_results > 2){
              movieArray.push(response.results[0].id);
              movieArray.push(response.results[1].id);
              movieArray.push(response.results[2].id);
            }
            else if (response.total_results > 1){
              movieArray.push(response.results[0].id);
              movieArray.push(response.results[1].id);
            }
            else if (response.total_results > 0){
              movieArray.push(response.results[0].id);
            }
            else{}
          });
        });
      };
    movieShuffle();
    movieGetter();
  }
//Search for each ID
idKeyword();

var testArray = movieArray;
function movieShuffle(){
  for (var i = 0; i < movieArray.length; i++){
    var movieNumber;

    //Push randomized movie into searching array
    movieNumber = movieArray[Math.floor(Math.random()*movieArray.length)];
    searchingMovieArray.push(movieArray[movieNumber]);
    //Remove added film from original array so duplicates dont occur
    movieArray.splice(movieNumber, 1);
  }
}



function movieGetter(){
  for (var i = 0; i < movieArray.length; i++)
    var movieURL = "https://api.themoviedb.org/3/movie/" + movieArray[i] + "?api_key=4eea97057056c04b2e278ac4baa59a43&language=en-US"
    var settings;

    settings = {
    "async": true,
    "crossDomain": true,
    "url": movieURL,
    "method": "GET",
    "headers": {},
    "data": "{}", 
    }

    $.ajax(settings).done(function (response){
      var thisPosterURL = "https://image.tmdb.org/t/p/w1280" + response.belongs_to_collection.poster_path;
      var thisName = response.title;
      var thisReleaseDate = response.release_date;
      var thisRuntime = response.runtime;
      var thisOverview = response.overview;
      var thisIMDBId = reponse.imdb_id;

      //Take data and push it to HTML and Firebase

      //We can search the OMDB database as well if we want more details
    });

}
  












