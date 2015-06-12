(function(angular, $){
	/*
	<td-slick slick-options="{arrows: true, dots: true}" 
		slides-to-show="slidesToShow" 
		speed="speed" 
		after-change="afterPage()">

		<div td-slick-item data-ng-repeat="item in [1,2,3,4] track by $index">{{item}}</div>
	</td-slick>
	E: Element <td-slick>
	A: attribute <div td-slick>
	*/
	angular.module('tdSlick', [])
	.directive('tdSlick', function(){

		return {
			restrict: 'E',
			scope:{
				slickOptions: '=',
				slidesToShow: '=',
				speed: '=',
				afterChange: '&'
			},
			controller:{},
			link: function(scope, element, attr, tdSlickCtrl){
				var options = scope.slickOptions;

				if(scope.slidesToShow){
					options.slidesToShow = scope.slidesToShow;
				}
				if(scope.speed){
					options.speed = scope.speed;
				}

				var ele = $(element).slick(options);
				tdSlickCtrl.element = ele;


			}
		}
	})
	.directive('tdSlickItem', function(){

		return {
			restrict: 'A',
			scope: {},
			require: '^tdSlick',
			link: function(scope, element, attr, tdSlickCtrl){
				tdSlick.element.slick('slickAdd', element);
			}
		}
	})
}(this.angular, this.jQuery))
