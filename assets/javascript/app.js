
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

var threeImg = [];

function readURL(input) {
	if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = addPicToPage;
    	reader.readAsDataURL(input.files[0]);
  	}
}

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
