/*  ------------------------Code goes here---------------------------------------------*/

// All necessary data for working with Indico API.
// three images of user favorite things
var threeImg = [];
/*User photo from web cam.
 *******In order to get user photo need to start page on server. 
 ********(Have no idea why browser doesn't want to give access to web-cam if you start index page locally)*/
var avatar;

// paragraph describing either user life, day, or current mood.
var paragraph;

var imgId = 0;

var trigger = 5;

// key words from image recognition
var imagesKeywords = [];

// Facial Emotion Recognition variable
var facialKeyword;
var facialKeywordObject;

//paragraph emonions keyword 
var paragraphKeyword;
var paragraphKeywordObject;

var indicoAPIkey = "7757e7fda1d6a89efbd1cc07880cc78f";

// reference to DB


// Get image from user 

$('#getRecomendedMovies').prop("disabled", true);

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
    var $image = $('<img>');
    $image.attr('src', img.target.result)
        .width(200)
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
    $('.del_img').on("click", function() {
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
            // console.log("stuff", stuff);
            imagesKeywords.push(stuff.split(', ')[0]);
            trigger--;
        });
    });
}

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
        // console.log("avatar obj: ", resp)
        var emotion = resp.results["0"].emotions;
        facialKeyword = getHighestKey(emotion);
        facialKeywordObject = emotion;
        trigger--;
    });
}

function paragraphIndico() {
    $.post(
        'https://apiv2.indico.io/emotion',
        JSON.stringify({
            'api_key': indicoAPIkey,
            'data': paragraph,
            'threshold': 0.1
        })
    ).then(function(response) {
        var resp = JSON.parse(response);
        paragraphKeyword = getHighestKey(resp.results);
        paragraphKeywordObject = resp.results;
        trigger--;
    });
}

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

$('#getRecomendedMovies').on('click', function() {
    paragraph = $('#paragraph').val();
    threeImgIndico();
    avatarIndico();
    paragraphIndico();

    var timer = setInterval(checkIndico, 500);


    function checkIndico() {
        if (trigger === 0) {
            clearInterval(timer);
            // console.log("paragraphKeyword: ", paragraphKeyword);
            // console.log("imagesKeywords: ", imagesKeywords);
            // console.log('avatarIndico: ', facialKeyword);
            // console.log("****************************************************");
            // console.log("facialKeywordObject: ");
            // console.log(facialKeywordObject);
            // console.log("****************************************************");
            // console.log("paragraphKeywordObject: ");
            // console.log(paragraphKeywordObject);
            // ALL INDICO QUERIES DONE. CAN START QUERING MOVIES API
        }
    }
});

// Some call it the sunshine state. i love sand and blue sky. and this ocean air.