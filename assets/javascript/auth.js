 // Initialize Firebase
	  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA_fu2UaPSlieTOLsBfHF0RnqUYrJVS1WE",
    authDomain: "what-to-watch-db8c3.firebaseapp.com",
    databaseURL: "https://what-to-watch-db8c3.firebaseio.com",
    storageBucket: "what-to-watch-db8c3.appspot.com",
    messagingSenderId: "286455706703"
  };
  firebase.initializeApp(config);



$('#login').click(signInWithEmailAndPassword);
$('#register').on("click", createAccaunt);

function createAccaunt(event){
	event.preventDefault();
	var displayName = $('#userName').val();
	var email = $('#emailR').val();
	var password = $('#pwdR').val();

	firebase.auth().createUserWithEmailAndPassword(email,password)
		.then(function(user){
			user.updateProfile({displayName:displayName});
			$("#user-name").html(", "+displayName);
		})
		.catch(function(error){
			console.log('register error', error);
		})
}

function signInWithEmailAndPassword(event){
	event.preventDefault();
	var email = $('#email').val();
	var password = $('#pwd').val();

	firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error) {
  		console.log('sign in error', error);
	});

}

firebase.auth().onAuthStateChanged(authStateChangeListener);

function authStateChangeListener(user){
	//signin
	if (user) {
		//login
		$("#login-link").addClass('hide');
		$("#logout-link").removeClass('hide');
		$('#favorite').fadeIn();
		if (user.displayName !== null) {
			$("#user-name").html(", "+user.displayName);
		}
	}else{
		//not login
		$("#login-link").removeClass('hide');
		$("#logout-link").addClass('hide');
		$('#favorite').fadeOut();
		$("#user-name").empty();
	}
}

$("#logout-link").on("click", function(){
	firebase.auth().signOut()
		.catch(function (err) {
		   console.log("log Out error", err);
		});
});

$('#favorite').click(function(){
	var favField = $('#fav-field');
	if (favField.is(':visible')) {
		favField.fadeOut();
	}else
		favField.fadeIn();
});