(function(angular){
	// Shhhh
	angular.module('supersecret', [])
	// Oh Miley, you slay me.
	.directive('ohMiley', function(){
		var audio = document.createElement("AUDIO");
		audio.src = '/app/secret/supersecret.ogg';
		return {
			restrict: 'A',
			link: function(scope, element, attr){
				element.on('mouseover', function(){
					audio.play();
				});
				element.on('mouseout', function(){
					audio.pause();
				});
			}
		}
	});
}(this.angular))