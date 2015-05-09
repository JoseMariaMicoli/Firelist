'use strict';

firelist.controller('navCtrl', function ($scope, $location, toaster, Auth){

	$scope.signedIn = Auth.signedIn;

	$scope.logout = function(){
		Auth.logout();
		$location.path('/login');
		toaster.pop('success', 'Logout feito com sucesso');
	};
});