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

  var imgId = 0;

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
                    .then(response)
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
   

      
      var imagebatchInput = [
          "<IMAGE>",
          "<IMAGE>"
            ];
          indico.facialFeatures(imagebatchInput)
              .then(response)
              .catch(logError);

      });

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
          .then(response)
          .catch(logError);

  });90

$("#getMovies").click(function(){
  textbatchInput.push(paragraph);
  imagebatchInput.push(threeImg);
  webcamBatchInput.push(avatar);
})


console.log(textbatchInput);
console.log(imagebatchInput);
console.log(webcamBatchInput);