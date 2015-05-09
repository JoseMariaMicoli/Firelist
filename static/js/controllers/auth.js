'use strict';

firelist.controller('authCtrl', function($scope, $location, toaster, Auth){

	if(Auth.signedIn()) {
		$location.path('/');
	} 

	$scope.register = function(user){
		Auth.register(user).then(function(){
			toaster.pop('success', 'Registro efetuado com sucesso.');
			$location.path('/');
		}, function(err){
			toaster.pop('error', err);
		});
	};

	$scope.login = function(user){
		Auth.login(user).then(function(){
			$location.path('/');
			toaster.pop('success', 'Bem vindo!');
		}, function(err){
			toaster.pop('error', err);
		});
	};

	$scope.changePassword = function(user){
		Auth.changePassword(user).then(function(){
			$scope.user.email = '';
			$scope.user.oldPass = '';
			$scope.user.newPass = '';

			$location.path('/');
			toaster.pop('success', 'Senha alterada com sucesso.');
		}, function(err){
			toaster.pop('error', err);
		});
	};

});