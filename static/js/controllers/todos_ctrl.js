firelist.controller('TodoCtrl', function TodoCtrl($scope, $location, toaster, $firebaseArray) {
	var fireRef = new Firebase('https://myfirelist.firebaseio.com/');
	$scope.todos = $firebaseArray(fireRef);
	$scope.newTodo = '';
	$scope.editedTodo = null;

	$scope.$watch('todos', function(){
		var total = 0;
		var remaining = 0;
		$scope.todos.forEach(function(todo){
			total++;
			if (todo.completed === false) {
				remaining++;
			}
		});
		$scope.totalCount = total;
		$scope.remainingCount = remaining;
		$scope.allChecked = remaining === 0;
	}, true);

	$scope.addTodo = function(){
		var newTodo = $scope.newTodo.trim();
		if (!newTodo.length) {
			return;
		}
		// push to firebase
		$scope.todos.$add({
			title: newTodo,
			completed: false
		});
		toaster.pop('success', 'Tarefa adicionada com sucesso.');
		$scope.newTodo = '';
	};

	$scope.editTodo = function(todo){
		$scope.editedTodo = todo;
		$scope.originalTodo = angular.extend({}, $scope.editedTodo);
	};

	// update todo for changes we made
	$scope.doneEditing = function(todo){
		$scope.editedTodo = null;
		var title = todo.title.trim();
		if (title) {
			$scope.todos.$save(todo);
			toaster.pop('success', 'Tarefa modificada com sucesso.');
		} else {
			$scope.removeTodo(todo);
		}
	};

	$scope.removeTodo = function(todo){
		$scope.todos.$remove(todo);
		toaster.pop('danger', 'Tarefa removida com sucesso.');
	};

	// delete all todos that have been completed
	$scope.clearCompletedTodos = function(){
		angular.forEach($scope.todos, function(todo){
			if (todo.completed){
				$scope.todos.$remove(todo);
				toaster.pop('danger', 'Tarefas removidas com sucesso.');
			}
		});
	};

	// toggle completion status for all todos
	$scope.markAll = function(allCompleted){
		console.log(allCompleted)
		angular.forEach($scope.todos, function(todo){
			todo.completed = allCompleted;
			console.log(todo)
			$scope.todos.$save(todo);
			toaster.pop('success', 'Todas completas');
		});
		
	};
});