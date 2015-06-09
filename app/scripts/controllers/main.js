(function(angular){
	angular.module('MainCtrl', [])
		.controller('Main', ['$scope', function($scope){
			$scope.slidesToShow = 1;
			$scope.speed = 1000;
			$scope.showStuff = true;
			$scope.afterPage = function(){
				console.log(arguments);
				console.log('After page function fired!')
			}
		}]);
}(this.angular))