
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

// All necessary data for working with Indico API.
// three images of user favorite things
var threeImg = [];
/*User photo from web cam.
*******In order to get user photo need to start page on server. 
********(Have no idea why browser doesn't want to give access to web-cam if you start index page localy)*/
var avatar;

// paragraph describing either user life, day, or current mood.
var paragraph;

// Get image fron user 
function getImage(input) {
	if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = addPicToPage;
    	reader.readAsDataURL(input.files[0]);
  	}
}

//Add user image to the page and push code to threeImg array  
function addPicToPage(img){
	threeImg.push(img.target.result);
	var imgBlock = $('<div class="block">')
	var $image = $('<img>')
  	$image.attr('src', img.target.result)
  	.width(150)
  	.height(200);
  	$('#img-block').append(imgBlock.append($image));
	if (threeImg.length === 3) {
		$('#picture-uploader').prop("disabled", true);
	}
}


//Get user input from paragraph element
$('#submitParagraph').click(function(e){
  e.preventDefault;
  var $parElement = $('#paragraph');
  paragraph = $parElement.val();
  $parElement.val('We start working on your input');
  $parElement.prop("disabled", true);
})



