var database = firebase.database();

/*****************TEST MOVIES OBJECTS*****************/

$('#addToDB').on("click", function() {
    addMovieToDb(movies[0]);
    // addMovieToDb(movies[1]);
})

// $('#sugestions').on('click', function() {
//     showSuggestions(movies[0]);
// })
// var movies = [{
//         id: 100693,
//         poster_path: 'http://nerdist.com/wp-content/uploads/2015/06/terminator-feature-06272015.jpg',
//         original_title: "Terminator",
//         genres: ["action", "comedi"],
//         overview: "When a litter of dalmatian puppies are abducted by the minions of Cruella De Vil, the parents must find them before she uses them for a diabolical fashion statement.",
//         runtime: 79,
//         vote_average: 6.9
//     },
//     {
//         id: 1025487,
//         poster_path: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/05/27/09/blade-marvel-snipes.jpg',
//         original_title: "Blade",
//         genres: ["action", "comedi"],
//         overview: "When a litter of dalmatian puppies are abducted by the minions of Cruella De Vil, the parents must find them before she uses them for a diabolical fashion statement..",
//         runtime: 79,
//         vote_average: 6.9
//     }
// ]


/********************END TEST OBJECTS********************/

//on click rolling down/up list of saved movies. 
// Running function for adding movies to list.
$('#favorite').click(function() {
    var favField = $('#fav-field');
    if (favField.is(':visible')) {
        favField.slideUp();

    } else {
        showSavedMovies();
    }
});

// Addin list of **sugested** movies to the page     https://image.tmdb.org/t/p/w500/
// FIX
function showSuggestions(movie) {

    var posterURL = 'https://image.tmdb.org/t/p/w500/';

    var swiper = $('#swiper-wrapper-top');
    console.log(movie);
    var slide = $('<div class="swiper-slide" ></div>');
    var slideBottom = $('<div class="swiper-slide" ></div>');
    var greyBackground = $('<div id="movieBackground"></div>');
    slide.css('background-image', 'url(' + posterURL + movie.poster_path + ')');
    greyBackground.append("<h1>" + movie.original_title + "</h1>")
    greyBackground.append("<p>" + movie.overview + "</p>")
    greyBackground.append("<p>Runtime: " + movie.runtime + " min.</p>")
    greyBackground.append("<p>Rating: " + movie.vote_average + "</p>")
    greyBackground.append("<button class ='save-movie btn btn-default btn-sm' data-poster ='" + posterURL + movie.poster_path + "'  data-id='" + movie.id + "'> save movie</button>");
    slide.append(greyBackground);
    swiper.append(slide);
    slideBottom.css('background-image', 'url(' + posterURL + movie.poster_path + ')');
    $('#swiper-wrapper-bottom').append(slideBottom);

    $('.save-movie').on('click', function(event) {
        event.stopPropagation();
        event.stopImmediatePropagation();

        var slide = $(this).closest('#movieBackground');
        var id = $(this).data('id');
        console.log(slide);
        var poster_path = $(this).data('poster');
        console.log("movie poster", poster_path);
        var name = slide.children().eq(0).text();
        var overview = slide.children().eq(1).text();
        var runtime = slide.children().eq(2).text();
        var vote_average = slide.children().eq(3).text();

        var movie = {
            id: id,
            name: name,
            overview: overview,
            runtime: runtime,
            vote_average: vote_average,
            poster_path: poster_path
        };

        addMovieToDb(movie);

    });
    showSwiper();
}

// add mivie to DB on you account
function addMovieToDb(movie) {
    console.log(movie);

    var user = firebase.auth().currentUser;
    if (user !== null) {
        console.log('adding movie: ', movie.name);
        movie.dataAdded = firebase.database.ServerValue.TIMESTAMP;
        database.ref('/users/' + user.uid).child(movie.id).set(movie);
    } else {
        console.log("Login first in order to add movie to your profile!");
    }
}

//show list of saved movies
function showSavedMovies() {
    var user = firebase.auth().currentUser;
    return database.ref('/users/' + user.uid).once('value').then(function(snapshot) {
        var moviesList = snapshot.val();
        if (moviesList !== null) {
            $('#fav-field').html("");
        }
        for (var movie in moviesList) {
            addMovieToFavField(moviesList[movie]);
        }
        $('#fav-field').slideDown();
    });
}


// add movie to list of favorite movies
function addMovieToFavField(movie) {
    var movieItem = $('<div class="movie-list" id="' + movie.id + '"></div>');
    movieItem.append('<img src="' + movie.poster_path + '" alt= "Poster">');
    movieItem.append('<h2>' + movie.name + '<h2>');
    movieItem.append("<p>" + movie.overview + "</p>");
    movieItem.append("<p>Runtime: " + movie.runtime + "</p>");
    movieItem.append("<p>Rating: " + movie.vote_average + "</p>");
    movieItem.append("<a class='btn btn-info'  target='_blank' href='https://play.google.com/store/search?q=" + movie.name + "'>More on Google</a>");
    movieItem.append('<a class ="del_img_but del-movie btn btn-xl" data-id ="' + movie.id + '"><i class="glyphicon glyphicon-remove"></i></a>')
    $('#fav-field').append(movieItem);

    $('.del_img_but').on("click", function(event) {
        event.stopPropagation();
        event.stopImmediatePropagation();

        var idForRemove = $(this).data('id');
        $('#' + idForRemove).slideUp();
        database.ref('/users/' + firebase.auth().currentUser.uid + '/' + movie.id).remove();
    })
};


// Firebase listener for adding new movie
function firebaseChildAdded() {
    database.ref('/users/' + firebase.auth().currentUser.uid).on("child_added", function(snapshot) {
        // console.log("listener for adding movie",snapshot.val());
        addMovieToFavField(snapshot.val());
    });
}

// Firebase listener for deleting movie
function firebaseChildRemoved() {
    database.ref('/users/' + firebase.auth().currentUser.uid).on('child_removed', function(snapshot) {
        $('#' + snapshot.val().id).remove();
    });
}



//Swiper initialization
function showSwiper() {
    $('#main').fadeOut();
    $('#swiper-field').fadeIn();
    var galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
    });
    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true
    });
    galleryTop.params.control = galleryThumbs;
    galleryThumbs.params.control = galleryTop;
}