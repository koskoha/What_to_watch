
  var database = firebase.database();

/*****************TEST MOVIES OBJECTS*****************/

$('#addToDB').on("click",function(){
	// addMovieToDb(movies[0]);
	addMovieToDb(movies[1]);
})

$('#sugestions').on('click', function(){
	showSuggestions();
  showSwiper();
})
  var movies =[
    {
      id: 100693,
      poster_path:'http://nerdist.com/wp-content/uploads/2015/06/terminator-feature-06272015.jpg',
      name:"Terminator",
      genres:["action", "comedi"],
      overview:"When a litter of dalmatian puppies are abducted by the minions of Cruella De Vil, the parents must find them before she uses them for a diabolical fashion statement.",
      runtime:79,
      vote_average:6.9
    },
    {
      id:1025487,
      poster_path:'https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/05/27/09/blade-marvel-snipes.jpg',
      name:"Blade",
      genres:["action", "comedi"],
      overview:"When a litter of dalmatian puppies are abducted by the minions of Cruella De Vil, the parents must find them before she uses them for a diabolical fashion statement..",
      runtime:79,
      vote_average:6.9
    }
  ]


  /********************END TEST OBJECTS********************/

  //on click rolling down/up list of saved movies. 
  // Running function for adding movies to list.
  $('#favorite').click(function(){
    var favField = $('#fav-field');
    if (favField.is(':visible')) {
      favField.slideUp();
      
    }else{
      showSavedMovies();
    }
});

// Addin list of **sugested** movies to the page
// FIX
function showSuggestions(movies){
  
    return database.ref('/users/' + firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
      console.log(snapshot.val());
      var moviesList = snapshot.val();
      var swiper = $('.swiper-wrapper');
      for(var movie in moviesList){
        console.log(movie);
        var slide = $('<div class="swiper-slide"></div>');
        slide.css('background-image', 'url('+moviesList[movie].poster_path+')');
        slide.append("<h1>"+moviesList[movie].name+"</h1>")
        slide.append("<p>"+moviesList[movie].overview+"</p>")
        slide.append("<p>Runtime: "+moviesList[movie].runtime+"</p>")
        slide.append("<p>Rating: "+moviesList[movie].vote_average+"</p>")
        swiper.append(slide);
      }
    });
}

// add mivie to DB on you account
function addMovieToDb(movie){
  var user = firebase.auth().currentUser;
  if (user !== null) {
    console.log('adding movie: ', movie.name);
    movie.dataAdded = firebase.database.ServerValue.TIMESTAMP;
    database.ref('/users/'+user.uid).child(movie.id).set(movie);
  }else{
    console.log("Login first in order to add movie to your profile!");
  }
}

//show list of saved movies
function showSavedMovies(){
  var user = firebase.auth().currentUser;
  return database.ref('/users/' + user.uid).once('value').then(function(snapshot) {
    var moviesList = snapshot.val();
    if (moviesList !== null) {
      $('#fav-field').html("");
    }
    for(var movie in moviesList){
      addMovieToFavField(moviesList[movie]);
    }
    $('#fav-field').slideDown();
  });
}


// add movie to list of favorite movies
function addMovieToFavField(movie){
  var user = firebase.auth().currentUser;
  var movieItem = $('<div class="movie-list" id="'+movie.id+'"></div>');
  movieItem.append('<img src="'+movie.poster_path+'" alt= "Poster">');
  movieItem.append('<h2>'+movie.name+'<h2>');
  movieItem.append("<p>"+movie.overview+"</p>");
  movieItem.append("<p>Runtime: "+movie.runtime+" min.</p>");
  movieItem.append("<p>Rating: "+movie.vote_average+"</p>");
  movieItem.append('<a class ="del_img_but del-movie btn btn-xl" id ="'+movie.id+'"><i class="glyphicon glyphicon-remove"></i></a>')
  $('#fav-field').append(movieItem);

  $('#'+movie.id).on("click", function(){
    console.log("id for deletionL: ",'/users/' + user.uid+'/'+movie.id)
    $('#'+movie.id).slideUp();
    database.ref('/users/' + user.uid+'/'+movie.id).remove();
  })
};


// Firebase listener for adding new movie
database.ref('/users/').on("child_added", function(snapshot){
  console.log("listener for adding movie",snapshot.val());
  addMovieToFavField(snapshot.val());
});

// Firebase listener for deleting movie
database.ref('/users/' + firebase.auth().currentUser.uid).on('child_removed',function(snapshot){
   $('#'+snapshot.val().id).remove();
});



//Swiper initialization
function showSwiper(){
  $('#main').fadeOut();
  $('#swiper-field').fadeIn();
  var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 'auto',
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true
        }
    });
}
