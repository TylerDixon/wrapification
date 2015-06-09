(function(angular, $){
	// Needs:
	// Set up all available options
	// we want slides to show, speed, and rtl to be dynamic
	// We want to listen to the after change and before change events
	// we also want to manually set the slide to go to
	angular.module('tdSlick', [])
		.run(function(){
			if(!$ || !$.fn, || !$.fn.slick){
				throw new Error('jQuery and slick are needed to use the tdSlick module');
			}
		})
		.directive('tdSlick',[function(){
			
			return{
				// 
				restrict: 'E', //Control of the template, thus restrict to element
				scope: {
					slickOptions: '=',
					slidesToShow: '=',
					speed: '=',
					autoplay: '=',
					afterChange: '&'
				},
				controller: function(){
					// Controller for us to attach things and stuff to!
				},
				link: function(scope, element, attr, tdSlickCtrl){
					// Initialize with our options
					var slickOptions = angular.extend({}, scope.slickOptions);

					// What about those options being grabbed from attributes?
					var watchOptions = ['slidesToShow', 'speed', 'rtl', 'autoplay'];
					watchOptions.forEach(function(opt){
						if(opt in scope){
							if(opt in slickOptions){
								console.warn('The ' + opt + ' attribute setting will overwrite the value passed in through the directive options.');
							}
							slickOptions[opt] = scope[opt];
						}
					});

					// Initialize our slickObj!
					tdSlickCtrl.slickObj = $(element).slick(slickOptions);

					// Now, what if those watcher values change????
					watchOptions.forEach(function(opt){
						scope.$watch(opt, function(v){
							if(v !== undefined){
								tdSlickCtrl.slickObj.slick('slickSetOption', opt, v, true);								
							}
						});
					});

					// Let's go ahead and listen for some events because we want to
					if(('afterChange' in scope) && scope.afterChange){
						tdSlickCtrl.slickObj.on('afterChange', function(event, slick, currentSlide){
							debugger;
							scope.$evalAsync(function(){
							debugger;
								scope.afterChange({
									$event: event,
									$currentSlide: currentSlide
								})
							});
						});
					}

					// Clean up
					scope.$on('$destroy', function(){
						tdSlickCtrl.slickObj.slick('unslick');
					})
				}
			}
		}])
		.directive('tdSlickItem', function(){
			return {
				require: '^tdSlick',	
				restrict: 'EA',
				scope: {

				},
				link:  function(scope, element, attr, tdSlickCtrl){
					tdSlickCtrl.slickObj.slick('slickAdd', element);
					scope.$on('$destroy', function(){
						tdSlickCtrl.slickObj.slick('slickRemove', element);
					})
				}
			}
		});
}(this.angular, this.jQuery))