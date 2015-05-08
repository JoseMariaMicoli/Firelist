// TODO focus directive
firelist.directive('todoFocus', function todoFocus($timeout){
	return function(scope, elem, attrs){
		scope.$watch(attrs.todoFocus, function(newVal){
			if (newVal){
				$timeout(function(){
					// sets focus to edit input field
					elem[0].focus();
				}, 0, false);
			}
		});
	};
});