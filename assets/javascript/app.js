/*  ------------------------Code goes here---------------------------------------------*/

// three images of user favorite things
var threeImg = [];
/*User photo from web cam.
 *******In order to get user photo need to start page on server. */
var avatar;

// paragraph describing either user life, day, or current mood.
var paragraph;


var imgId = 0;

// counter of Indico api requests
var trigger = 5;

// key words from image recognition
var imagesKeywords = [];

// Facial Emotion keyword/object
var facialKeyword;
var facialKeywordObject;

//paragraph emonions keyword/object of keywords
var paragraphKeyword;
var paragraphKeywordObject;
var sortedParagraphKeywordArray;

var indicoAPIkey = "7757e7fda1d6a89efbd1cc07880cc78f";

//Array of movie objects
var genreArray = [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }];
var movieArray = [];
var searchingMovieArray = [];
var keywordArray = [];
var keywordIdArray = [];
var genreId = 0;
var genre;
var movieObjectArray = [];
// referense to DB


//Converts emotion spectrum into a genre

function emoteGenre(input) {
    if (input.Angry > 0.3) {
        return "war";
    }
    if (input.Happy > 0.3) {
        return "animation";
    }
    if (input.Fear > 0.3) {
        return "thriller";
    }
    if (input.Sad > 0.3) {
        return "comedy";
    }
    if (input.Surprise > 0.3) {
        return "mystery";
    }
    if (input.Angry > 0.2 && input.Surprise > 0.2) {
        return "crime";
    }
    if (input.Happy > 0.2 && input.Surprise > 0.2) {
        return "action";
    }
    if (input.Fear > 0.2 && input.Surprise > 0.2) {
        return "horror";
    }
    if (input.Sad > 0.2 && input.Surprise > 0.2) {
        return "fantasy";
    }
    if (input.Angry > 0.2 && input.Happy > 0.2) {
        return "adventure";
    }
    if (input.Angry > 0.2 && input.Fear > 0.2) {
        return "western";
    }
    if (input.Angry > 0.2 && input.Happy > 0.2) {
        return "adventure";
    }
    if (input.Happy > 0.2 && input.Fear > 0.2) {
        return "romance";
    }
    if (input.Sad > 0.2 && input.Fear > 0.2) {
        return "drama";
    }
    if (input.Angry > 0.2 && input.Sad > 0.2) {
        return "music";
    } else {
        return "tv movie";
    }
}


$('#getRecomendedMovies').prop("disabled", true);

// Get image from user
function getImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = addPicToPage;
        reader.readAsDataURL(input.files[0]);
    }
}

//Add user image to the page and push this image to threeImg array
function addPicToPage(img) {

    threeImg.push({ id: imgId, img: img.target.result });
    var $imgSquare = $('<div class="images"></div');
    var $remove = $('<a class ="del_img_but del_img btn btn-primary btn-circle btn-xl" data-id ="' + imgId + '"><i class="glyphicon glyphicon-remove"></i></a>');
    var $image = $("<img class ='item-image'>");
    $image.attr('src', img.target.result)
        .width("auto")
        .height(200);
    $('#img-block').append($imgSquare.append($image).append($remove));
    $imgSquare.hide().fadeIn("slow");

    if (threeImg.length === 3) {
        $('#picture-uploader').prop("disabled", true);
        $('#getRecomendedMovies').prop("disabled", false);
    } else {
        $('#getRecomendedMovies').prop("disabled", true);
    }
    imgId++;
    //
    $('.del_img_but').on("click", function() {
        var id = $(this).data('id');
        $(this).closest('.images').remove();
        threeImg = threeImg.filter(function(element) {
            return element.id !== id;
        });
        $('#getRecomendedMovies').prop("disabled", true);
        $('#picture-uploader').prop("disabled", false);
    });
}


//********************* Indico API functions ******************************

// querying Indico API for 3 favorite images
//saving keywords from images to variables;
function threeImgIndico() {
    threeImg.forEach(function(image) {
        $.post(
            'https://apiv2.indico.io/imagerecognition',
            JSON.stringify({
                'api_key': indicoAPIkey,
                'data': image.img,
                'threshold': 0.1
            })
        ).then(function(response) {
            var resp = JSON.parse(response);
            var stuff = getHighestKey(resp.results);
            imagesKeywords.push(stuff.split(', ')[0]);
            keywordArray.push(stuff.split(', ')[0]);
            trigger--;
        });
    });
}


// querying Indico API for user photo.
// getting facial emotions keywords to variable
function avatarIndico() {
    $.post(
        'https://apiv2.indico.io/fer',
        JSON.stringify({
            'api_key': indicoAPIkey,
            'data': avatar,
            'detect': true
        })
    ).then(function(response) {
        var resp = JSON.parse(response);
        var emotion = resp.results["0"].emotions;
        facialKeywordObject = emotion;
        genre = emoteGenre(emotion);
        trigger--;
    });
}

// querying Indico API for paragraph
function paragraphIndico() {
    $.post(
        'https://apiv2.indico.io/keywords?version=2',
        JSON.stringify({
            'api_key': indicoAPIkey,
            'data': paragraph,
            'threshold': 0.1
        })
    ).then(function(response) {
        var resp = JSON.parse(response);
        paragraphKeywordObject = resp.results;
        sortedParagraphKeywordArray = sortProperties(paragraphKeywordObject);
        keywordArray.push(sortedParagraphKeywordArray[0][0]);
        keywordArray.push(sortedParagraphKeywordArray[1][0]);
        keywordArray.push(sortedParagraphKeywordArray[2][0]);
        keywordArray.push(sortedParagraphKeywordArray[3][0]);
        keywordArray.push(sortedParagraphKeywordArray[4][0]);
        trigger--;
    });
}

function sortProperties(obj) {
    // convert object into array
    var sortable = [];
    for (var key in obj)
        if (obj.hasOwnProperty(key))
            sortable.push([key, obj[key]]); // each item is an array in format [key, value]

        // sort items by value
    sortable.sort(function(a, b) {
        return b[1] - a[1]; // compare numbers
    });
    return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}

// return property with highest value from response object
function getHighestKey(response) {
    var highestKey = "";
    var highestKeyValue = 0;
    for (var key in response) {
        if (highestKeyValue < response[key]) {
            highestKey = key;
            highestKeyValue = response[key];
        }
    }
    return highestKey;
}

/* --------------------------The MovieDB Functions ------------*/

function genreFinder() {
    genreArray.forEach(function(nameG) {
        if (genre === nameG.name.toLowerCase()) {
            genreId = nameG.id;
        }
    });
}

function idKeyword() {
    var keywordURL;
    var settings;
    genreFinder();
    for (var i = 0; i < keywordArray.length; i++) {
        keywordURL = "https://api.themoviedb.org/3/search/keyword?api_key=4eea97057056c04b2e278ac4baa59a43&query=" + keywordArray[i] + "&page=1";
        settings = {
            "async": true,
            "crossDomain": true,
            "url": keywordURL,
            "method": "GET",
            "headers": {},
            "data": "{}",
        };

        $.ajax(settings).done(function(response) {
            //pull first keyword id number from array
            if (response.results[0] !== undefined) {
                keywordIdArray.push(response.results[0].id);
                var thisKeywordId = response.results[0].id;
                var movieIdURL;
                var settings;

                //search for movies with proper keyword and genre
                movieIdURL = "https://api.themoviedb.org/3/discover/movie?api_key=4eea97057056c04b2e278ac4baa59a43&language=en-US&sort_by=popularity.desc&page=1&with_genres=" + genreId + "&with_keywords=" + thisKeywordId;

                settings = {
                    "url": movieIdURL,
                };
                //Pulls films from each query and push their JSON Data to a new array
                $.ajax(settings).done(function(response) {
                    console.log(response);
                    if (response.total_results > 4) {
                        movieGetter(response.results[0].id);
                        movieGetter(response.results[1].id);
                        movieGetter(response.results[2].id);
                        movieGetter(response.results[3].id);
                        movieGetter(response.results[4].id);
                    } else if (response.total_results > 3) {
                        movieGetter(response.results[0].id);
                        movieGetter(response.results[1].id);
                        movieGetter(response.results[2].id);
                        movieGetter(response.results[3].id);
                    } else if (response.total_results > 2) {
                        movieGetter(response.results[0].id);
                        movieGetter(response.results[1].id);
                        movieGetter(response.results[2].id);
                    } else if (response.total_results > 1) {
                        movieGetter(response.results[0].id);
                        movieGetter(response.results[1].id);
                    } else if (response.total_results > 0) {
                        movieGetter(response.results[0].id);
                    } else {}
                });
            } else {
                return;
            }
        });
    }
    movieShuffle();
}



var testArray = movieArray;

function movieShuffle() {
    for (var i = 0; i < movieArray.length; i++) {
        var movieNumber;

        //Push randomized movie into searching array
        movieNumber = movieArray[Math.floor(Math.random() * movieArray.length)];
        searchingMovieArray.push(movieArray[movieNumber]);
        //Remove added film from original array so duplicates dont occur
        movieArray.splice(movieNumber, 1);
    }
}

//Pushes the JSON data of a movie to the movieObjectArray
function movieGetter(thisID) {
    var movieURL = "https://api.themoviedb.org/3/movie/" + thisID + "?api_key=4eea97057056c04b2e278ac4baa59a43&language=en-US";
    var settings;

    settings = {
        "async": true,
        "crossDomain": true,
        "url": movieURL,
        "method": "GET",
        "headers": {},
        "data": "{}",
    };

    $.ajax(settings).done(function(response) {
        movieObjectArray.push(response);
        showSuggestions(response);
    });

}

//Start process getting recomended movies
$('#getRecomendedMovies').on('click', function() {
    paragraph = $('#paragraph').val();
    threeImgIndico();
    avatarIndico();
    paragraphIndico();

    var timer = setInterval(checkIndico, 500);


    function checkIndico() {
        if (trigger === 0) {
            clearInterval(timer);
            idKeyword();
            var miviesTimer = setTimeout(showSwiper, 5000);
            console.log("paragraphKeyword: ", paragraphKeyword);
            console.log("imagesKeywords: ", imagesKeywords);
            console.log('avatarIndico: ', facialKeyword);
            console.log("****************************************************");
            console.log("facialKeywordObject: ");
            console.log(facialKeywordObject);
            console.log("****************************************************");
            console.log("paragraphKeywordObject: ");
            console.log(paragraphKeywordObject);

        }
    }
});
