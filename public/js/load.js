var loginStatus = false;

window.addEventListener("load", function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            loginStatus = true;
            user.getIdToken().then(function(accessToken) {
                document.getElementById("username").textContent
                    = user.displayName + " (" + user.email + ")";
            });
        } else {
            signedIn = false;
			window.location.assign("/signin.html");
        }
    }, function(error) {
        console.log(error);
    });

    document.getElementById("sign-out").addEventListener(
        "click", function() {
                firebase.auth().signOut();
        }
    );
});

