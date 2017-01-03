MSPortfolio.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('landing', {
        url: '/',
        templateUrl: 'templates/main/landing.html'
    })
        .state('ms', {
            abstract: true,
            url: '',
            templateUrl: 'templates/app/aboutme.html'
        })
        .state('ms.professional', {
            url: '/professional',
            templateUrl: 'templates/app/professional.html',
            controller: "ProfessionalCtrl as pr"
        })
        .state('ms.project', {
            url: '/projects',
            templateUrl: 'templates/app/project.html',
            controller: "ProjectCtrl as pj"
        })
        .state('ms.education', {
            url: '/education',
            templateUrl: 'templates/app/education.html',
            controller: "EducationCtrl as ed"
        })
        .state('ms.contact', {
            url: '/contact',
            templateUrl: 'templates/main/contact.html',
            controller: "ContactCtrl as co"
        });
    $urlRouterProvider.otherwise('/');
}])
    /*
    .state('ms.personal', {
        url: '/personal',
        templateUrl: 'templates/app/personal.html',
        controller: "PersonalCtrl as pe"
        /*
        views: {

            // the main template will be placed here (relatively named)
            '': { templateUrl: 'templates/main/about.html' },

            // the child views will be defined here (absolutely named)
            'columnOne@ms.personal': { template: 'Look I am a column!' },

            // for column two, we'll define a separate controller 
            'columnTwo@ms.personal': { template: 'THIS is COLUMN Two' },
            //'columnTwo@about': {
            //    templateUrl: 'table-data.html',
            //    controller: 'scotchController'
            //}
        }
        *//*
        })


      .state('about', {
          url: '/about',
          //templateUrl: 'templates/main/about.html',
          views: {

              // the main template will be placed here (relatively named)
              '': { templateUrl: 'templates/main/about.html' },

              // the child views will be defined here (absolutely named)
              'columnOne@about': { template: 'Look I am a column!' },

              // for column two, we'll define a separate controller 
              'columnTwo@about': { template: 'THIS is COLUMN Two' },
              //'columnTwo@about': {
              //    templateUrl: 'table-data.html',
              //    controller: 'scotchController'
              //}
          }
      })
      .state('ms.portfolio', {
          url: '/ms',
          templateUrl: 'templates/app/parent.html',
          //controller: 'MSCtrl as vm'
      })
              .state('ms.portfolio.professional', {
                  templateUrl: 'templates/app/professional.html'
              })
              .state('ms.portfolio.personnel', {
                  templateUrl: 'templates/app/personnel.html',
                  //controller: 'TimeDuration as td'
              });
              */


.run(['$rootScope', 'SharedProperties',
    function ($rootScope, SP) {
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                if (fromState.url === "^" && toState.url === "/") {
                    SP.OnDirectOnLanding(true);
                } else {
                    SP.OnDirectOnLanding(false);
                }

                SP.UpdateBackground(toState.name);
            })
    }
]);