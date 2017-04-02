
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
//Create Genre Array
var genreArray = [{ "id": 28, "name": "Action"}, { "id": 12, "name": "Adventure"}, {"id": 16,"name": "Animation"}, {"id": 35, "name": "Comedy"},{"id": 80,"name": "Crime"},{"id": 99,"name": "Documentary"},{"id": 18, "name": "Drama"},{"id": 10751,"name": "Family"},{"id": 14,"name": "Fantasy"},{"id": 36,"name": "History"},{"id": 27,"name": "Horror"},{"id": 10402,"name": "Music"},{"id": 9648,"name": "Mystery"},{"id": 10749,"name": "Romance"},{"id": 878,"name": "Science Fiction"},{"id": 10770,"name": "TV Movie"},{"id": 53,"name": "Thriller"},{"id": 10752,"name": "War"},{"id": 37,"name": "Western"}]
var movieArray = [];
var searchingMovieArray = [];
var keywordArray = ["Basketball", "Dog", "cats"]
var genre = "Comedy"
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
      var thisPosterURL[i] = "https://image.tmdb.org/t/p/w1280" + response.belongs_to_collection.poster_path;
      var thisName[i] = response.title;
      var thisReleaseDate[i] = response.release_date;
      var thisRuntime[i] = response.runtime;
      var thisOverview[i] = response.overview;
      var thisIMDBId[i] = reponse.imdb_id;


      //Take data and push it to HTML and Firebase

      //We can search the OMDB database as well if we want more details
    });

}
  












