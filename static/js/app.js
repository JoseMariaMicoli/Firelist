var firelist = angular.module('firelist', [
		'firebase',
		'ngAnimate', 
		'ngRoute', 
		'toaster'
	])
	.constant('FURL', 'https://myfirelist.firebaseio.com/')
	.run(function($rootScope, $location) {
		$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
		// We can catch the error thrown when the $requireAuth promise is rejected
		// and redirect the user back to the login page
			if (error === "AUTH_REQUIRED") {
				$location.path("/login");
			}
		});
	})
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/browse.html',
				controller: 'TodoCtrl',
				resolve: {
					currentAuth: function(Auth) {
						return Auth.requireAuth();
					}
				}
			})
			.when('/register', {
				templateUrl: 'views/register.html',
				controller: 'authCtrl'
			})
			.when('/login', {
				templateUrl: 'views/login.html',
				controller: 'authCtrl'
			})
			.when('/changePassword', {
				templateUrl: 'views/changepass.html',
				controller: 'authCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});


