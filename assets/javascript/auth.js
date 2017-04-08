 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyA_fu2UaPSlieTOLsBfHF0RnqUYrJVS1WE",
     authDomain: "what-to-watch-db8c3.firebaseapp.com",
     databaseURL: "https://what-to-watch-db8c3.firebaseio.com",
     storageBucket: "what-to-watch-db8c3.appspot.com",
     messagingSenderId: "286455706703"
 };
 firebase.initializeApp(config);

 // Registration password matcher
 $('#pwdError').hide();
 $('#reenterpwd').keyup(function(e) {
     e.preventDefault();
     var password = $('#pwdR').val();
     var reenterPwd = $('#reenterpwd').val();
     if (password !== reenterPwd) {
         $('#pwdError').show();
     } else {
         $('#pwdError').hide();
     }

 });

 // Login button event listener
 $('#login').click(signInWithEmailAndPassword);
 // Register button event listener
 $('#register').on("click", createAccount);

 // Function which pull user data from login form inputs and create an account.
 //  Save user data to firebase.
 function createAccount(event) {
     event.preventDefault();
     var displayName = $('#userName').val();
     var email = $('#emailR').val();
     var password = $('#pwdR').val();
     var reenterPwd = $('#reenterpwd').val();

     firebase.auth().createUserWithEmailAndPassword(email, password)
         .then(function(user) {
             user.updateProfile({ displayName: displayName });
             $("#user-name").html(", " + displayName);
         })
         .catch(function(error) {
             console.log('register error', error);
         });
 }

 // Pull user data from firebase on login button click
 function signInWithEmailAndPassword(event) {
     event.preventDefault();
     var email = $('#email').val();
     var password = $('#pwd').val();

     firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
         console.log('sign in error', error);
     });

 }

 // firebase event listener for user status changes
 firebase.auth().onAuthStateChanged(authStateChangeListener);

 // Function which enable user links and show used data if user login
 // Hide user data if user logOut
 function authStateChangeListener(user) {
     //signin
     if (user) {
         //login
         firebaseChildAdded();
         firebaseChildRemoved();
         $("#login-link").addClass('hide');
         $("#logout-link").removeClass('hide');
         $('#favorite').fadeIn();
         if (user.displayName !== null) {
             $("#user-name").html(", " + user.displayName);
         }
     } else {
         //not login
         $('#fav-field').html("");
         $("#login-link").removeClass('hide');
         $("#logout-link").addClass('hide');
         $('#favorite').fadeOut();
         $("#user-name").empty();
     }
 }

 // Logout link event listener
 // login out user from database if logout link clicked
 $("#logout-link").on("click", function() {
     firebase.auth().signOut()
         .catch(function(err) {
             console.log("log Out error", err);
         });
 });