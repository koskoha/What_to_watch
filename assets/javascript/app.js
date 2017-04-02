
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

  var imgId = 0;

  // referense to DB
  var database = firebase.database();

  // Get image fron user 
  function getImage(input) {
  	if (input.files && input.files[0]) {
  		var reader = new FileReader();
  		reader.onload = addPicToPage;
  		reader.readAsDataURL(input.files[0]);
  	}
  }

  //Add user image to the page and push this image to threeImg array  
  function addPicToPage(img){

  	threeImg.push({id:imgId, img:img.target.result});
  	var $imgSquare = $('<div class="images"></div');
  	var $remove =$('<a class ="del_img btn btn-primary btn-circle btn-xl" data-id ="'+imgId+'"><i class="glyphicon glyphicon-remove"></i></a>')
  	var $image = $('<img>')
  	$image.attr('src', img.target.result)
  	.width(200)
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
    });
};


  //Get user input from paragraph element
  $('#submitParagraph').click(function(e){
  	e.preventDefault;
  	var $parElement = $('#paragraph');
  	paragraph = $parElement.val();
  	$parElement.prop("disabled", true);
  	$(this).prop("disabled", true);
  });


  /*****************TEST MOVIES OBJECTS*****************/
  var movies =[
	  {
	  	id: 100693,
	  	poster_path:'',
	  	name:"Terminator",
	  	genres:["action", "comedi"],
	  	overview:"this movie is about...",
	  	runtime:79,
	  	vote_average:6.9
	  },
	  {
	  	id:1025487,
	  	poster_path:'',
	  	name:"Terminator",
	  	genres:["action", "comedi"],
	  	overview:"this movie is about...",
	  	runtime:79,
	  	vote_average:6.9
	  }
  ]


  /****************************************/

// Addin list of movies to the page
function showSuggestions(){
	var user = firebase.auth().currentUser;
	if (user !== null){
		return firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
		  console.log(snapshot.val());
		});
	}else{
		console.log("Login first in order to see your saver sugested movies!");
	}
}
// add mivie to DB on you account
function addMovieToDb(movie){
	var user = firebase.auth().currentUser;
	if (user !== null) {
		database.ref('/users/'+user.uid).child(movie.id).set(movie);
	}else{
		console.log("Login first in order to add movie to your profile!");
	}
}

$('#addToDB').on("click",function(){
	addMovieToDb(movies[0]);
	addMovieToDb(movies[1]);
})

$('#sugestions').on('click', function(){
	showSuggestions();
})


//Swiper initialization
var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 'auto',
        paginationClickable: true,
        spaceBetween: 30
    });





