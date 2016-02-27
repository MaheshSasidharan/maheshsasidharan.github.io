AnnualReview

    .directive('backImg', function(){
        return function(scope, element, attrs){
            attrs.$observe('backImg', function(value) {
                element.css({
                    'background-image': 'url(' + value +')',
                    'background-size' : 'cover'
                });
            });
        };
    })

  .directive('myCurrentTime', ['$interval', 'dateFilter', function ($interval, dateFilter) {

      function link(scope, element, attrs) {
          var format,
              timeoutId;

          function updateTime() {
              element.text(dateFilter(new Date(), format));
          }

          scope.$watch(attrs.myCurrentTime, function (value) {
              format = value;
              updateTime();
          });

          element.on('$destroy', function () {
              $interval.cancel(timeoutId);
          });

          // start the UI update process; save the timeoutId for canceling
          timeoutId = $interval(function () {
              updateTime(); // update DOM
          }, 1000);
      }

      return {
          link: link
      };
  }]);