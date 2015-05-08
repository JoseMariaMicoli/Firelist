// TODO blur directive
firelist.directive('todoBlur', function () {
	return function (scope, elem, attrs) {
		elem.bind('blur', function(){
			// run function we pass in to attribute on blur
			scope.$apply(attrs.todoBlur);
		});
	};
});