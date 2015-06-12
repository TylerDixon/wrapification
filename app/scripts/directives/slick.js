(function(angular, $){
	// Needs:
	// Set up all available options
	// we want slides to show and speed to be dynamic
	// We want to listen to the after change event
	angular.module('tdSlick', [])

		// In a run function, you should check the availability
		// of your library, throwing an error if it isn't available.
		.run(function(){
			if(!$ || !$.fn || !$.fn.slick){
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
					afterChange: '&'
				},
				controller: function(){
					// Controller for us to attach things and stuff to!
				},
				link: function(scope, element, attr, tdSlickCtrl){
					// Initialize with our options
					var slickOptions = angular.extend({}, scope.slickOptions);

					// What about those options being grabbed from attributes?
					var watchOptions = ['slidesToShow', 'speed'];
					watchOptions.forEach(function(opt){
						if(opt in scope){
							// Warn when your attribute will overwrite the passed in slick options
							if(opt in slickOptions){
								console.warn('[tdSlick] The ' + opt + ' attribute setting will overwrite the value passed in through the directive options.');
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
								// Update them!
								tdSlickCtrl.slickObj.slick('slickSetOption', opt, v, true);								
							}
						});
					});
					

					// Let's go ahead and listen for some events because we want to
					if(('afterChange' in scope) && scope.afterChange){
						tdSlickCtrl.slickObj.on('afterChange', function(event, slick, currentSlide){
							scope.$evalAsync(function(){
								// Allows us to override locals with information that the
								// outside scope function may want from this event.
								// We prefix it with a `$` so that we are less
								// likely to be overriding a scope variable that
								// the outside function may want to use.
								scope.afterChange({
									$event: event,
									$currentSlide: currentSlide
								})
							});
						});
					}

					// Clean up whatever possible when $destroy is called.
					// In this case, `unslick` removes all listeners for us
					// so we don't have to remove them manually.
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