
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


 /*  -----------------------TheMovieDB Code Here------------------------------*/
//https://api.themoviedb.org/3/movie/76341?api_key={4eea97057056c04b2e278ac4baa59a43}
//var list
var genreArray = [];
var idArray = [];
var movieArray = [];
var keywordArray = ["Basketball", "Cat", "Cars"]
var genre = "Comedy"
genre = genre.toLowerCase();
var genreId = 0;

//func list
//Look into error later
function genreFinder(){
  genreArray.forEach(function(nameG){
    if (genre === nameG.name.toLowerCase()){
      genreId = nameG.id;
    }
  })
};

//Look into Success > Complete Ajax commands

//Create Genre Array
function createGenre(){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=4eea97057056c04b2e278ac4baa59a43",
    "method": "GET",
    "headers": {},
    "data": "{}",
    "success" : idKeyword() 
  }

  $.ajax(settings).done(function (response) {
    genreArray = response.genres;
    genreFinder()
  });
}
//Apply Genre to search query
createGenre();


//Pull IDs from keyword Array
function idKeyword(){
  var keywordURL;
  var settings;

  for (var i=0; i < keywordArray.length; i++){
      keywordURL = "https://api.themoviedb.org/3/search/keyword?api_key=4eea97057056c04b2e278ac4baa59a43&query=" + keywordArray[i] + "&page=1"

      //Create an AJAX request
      settings = {
        "url": keywordURL,
        }

      //pull first id number from array
      //push to new array
      $.ajax(settings).done(function (response) {
        idArray.push(response.results[0].id);
    });
  }

  $.when.apply(null, idArray).done(movieIdPull);
}


//Search for each ID
function movieIdPull(){
 
    var movieIdURL;
    var settings;

    for (var i=0; i < keywordArray.length; i++){

      movieIdURL = "https://api.themoviedb.org/3/discover/movie?api_key=4eea97057056c04b2e278ac4baa59a43&language=en-US&sort_by=popularity.desc&page=1&vote_average.gte=6.5&with_genres=" + genreId + "&with_keywords=" + idArray[i]

      //Pull Three films from each query and push their Ids to a new array
      settings = {
        "url": movieIdURL,
      }

      $.ajax(settings).done(function (response) {
        console.log('movieIdURL', movieIdURL)
        console.log('movieIdPull repsonse', response);
      });
    }
  
}
//Duplicate new array

//Search each film at random in array and push to HTML

//Remove each film from duplicate array each time you make a query

//Stop when length of array is done






