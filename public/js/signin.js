var uiConfig = {
        callbacks: {
          signInSuccess: function(currentUser, credential, redirectUrl) {
            return true;
          }
        },
        credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
        queryParameterForWidgetMode: 'mode',
        queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
        signInFlow: 'popup',
        signInSuccessUrl: '/home.html',
        signInOptions: [
		{
			provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			authMethod: 'https://accounts.google.com'
		}
        ]
      };

var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);

