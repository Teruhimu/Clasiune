angular
  .module('app')
  .run(function ($transitions, $window, toastr) {
    // 
    $transitions.onStart({}, function (trans) {
      // let mostrarPantalla = true;
      var yendoalestado = trans.to();
      if (yendoalestado.name == 'appSimple.login') {
      }
      else {
        var $auth = trans.injector().get('$auth');

        return true
        if (!$auth.isAuthenticated()) {

          return trans.router.stateService.target('appSimple.login');
        } else {
          if (yendoalestado.name != 'appSimple.usuarioContrasenaTemporal') {
            if ($auth.getPayload().appuserContrasenaTemporal) {

              return trans.router.stateService.target('appSimple.usuarioContrasenaTemporal');
            }
          }
          if (yendoalestado.name == 'app.main' || yendoalestado.name == 'appSimple.usuarioContrasenaTemporal') {
            return true
          } else {
            
            return true;
          }
        }

      }


    })
    // $transitions.onSuccess(null, function(transition) {
    //     $window.loading_screen.finish();
    // });
  })
  .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {

    $urlRouterProvider.otherwise('/dashboard');

    $ocLazyLoadProvider.config({
      // Set to true if you want to see what and when is dynamically loaded
      debug: false
    });

    $breadcrumbProvider.setOptions({
      prefixStateName: 'app.main',
      includeAbstract: true,
      template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
    });

    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'views/common/layouts/full.html',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Root',
          skip: true
        },
        resolve: {
          loadCSS: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load CSS files
            return $ocLazyLoad.load([{
              serie: true,
              name: 'Flags',
              files: ['node_modules/flag-icon-css/css/flag-icon.min.css']
            }, {
              serie: true,
              name: 'Font Awesome',
              files: ['node_modules/font-awesome/css/font-awesome.min.css']
            }, {
              serie: true,
              name: 'Simple Line Icons',
              files: ['node_modules/simple-line-icons/css/simple-line-icons.css']
            },
              // {
              //   serie: true,
              //   name: 'Toastr',
              //   files: ['node_modules/angular-toastr/dist/angular-toastr.min.css']
              // }
            ]);
          }],
          loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load([{
              serie: true,
              name: 'chart.js',
              files: [
                'node_modules/chart.js/dist/Chart.min.js',
                'node_modules/angular-chart.js/dist/angular-chart.min.js'
              ]
            }]);
          }],
        }
      })
      .state('app.main', {
        url: '/dashboard',
        templateUrl: 'views/main.html',
        controller: 'mainCtrl',
        controllerAs: 'vm',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Escritorio',
        },
        //page subtitle goes here
        params: { subtitle: 'Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit' },
        resolve: {
          loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load([
              {
                serie: true,
                name: 'chart.js',
                files: [
                  'node_modules/chart.js/dist/Chart.min.js',
                  'node_modules/angular-chart.js/dist/angular-chart.min.js'
                ]
              },
            ]);
          }],
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/mainCtrl.js']
            });
          }]
        }
      })
  
      .state('app.estadoCuenta', {
        url: '/estado-cuenta/lista',
        templateUrl: 'views/estado-cuenta-list.html',
        controller: 'estadoCuentaListCtrl',
        controllerAs: 'vm',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Estado de cuenta',
        },
        //page subtitle goes here
        params: { subtitle: 'Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit' },
        resolve: {
          loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load([
              {
                serie: true,
                name: 'chart.js',
                files: [
                  'node_modules/chart.js/dist/Chart.min.js',
                  'node_modules/angular-chart.js/dist/angular-chart.min.js'
                ]
              },
            ]);
          }],
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/estadoCuentaListCtrl.js']
            });
          }]
        }
      })
   
      .state('app.maestros', {
        abstract: true,
        ncyBreadcrumb: {
          label: 'Maestros',
        }
      })

     

      .state('appSimple', {
        abstract: true,
        templateUrl: 'views/common/layouts/simple.html',
        resolve: {
          loadCSS: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load CSS files
            return $ocLazyLoad.load([{
              serie: true,
              name: 'Font Awesome',
              files: ['node_modules/font-awesome/css/font-awesome.min.css']
            }, {
              serie: true,
              name: 'Simple Line Icons',
              files: ['node_modules/simple-line-icons/css/simple-line-icons.css']
            }]);
          }],
        }
      })

      // Additional Pages
      .state('appSimple.login', {
        url: '/login',
        templateUrl: 'views/pages/login.html',
        controller: 'loginCtrl',
        controllerAs: 'vm',
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/loginCtrl.js']
            });
          }]
        }
      })
      .state('appSimple.forgot', {
        url: '/restaurar',
        templateUrl: 'views/pages/restaurar.html',
        controller: 'restaurarCtrl',
        controllerAs: 'vm',
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/restaurarCtrl.js']
            });
          }]
        }
      })
   
      // .state('appSimple.register', {
      //   url: '/register',
      //   templateUrl: 'views/pages/register.html'
      // })
      .state('appSimple.register', {
        url: '/registrar',
        templateUrl: 'views/pages/register.html',
        controller: 'registerCtrl',
        controllerAs: 'vm',
       
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            
            return $ocLazyLoad.load({
              files: ['js/controllers/registerCtrl.js']
            });
          }]
        }
      })
      .state('appSimple.404', {
        url: '/404',
        templateUrl: 'views/pages/404.html'
      })
      .state('appSimple.500', {
        url: '/500',
        templateUrl: 'views/pages/500.html'
      })

    

    
   
      .state('app.restaurar', {
        url: '/restaurar',
        templateUrl: 'views/restaurar.html',
        controller: 'restaurarCtrl',
        controllerAs: 'vm',
        params: { subtitle: 'restaurar' },
        ncyBreadcrumb: {
          label: 'restaurar',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            
            return $ocLazyLoad.load({
              files: ['js/controllers/restaurarCtrl.js']
            });
          }]
        }
      })
        // App Usuarios Activar
        .state('appSimple.usuarioActivar', {
          url: '/usuario-activar/:appuserEmail/:appuserHash',
          templateUrl: 'views/activar.html',
          controller: 'activarCtrl',
          controllerAs: 'vm',
          resolve: {
              loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                  
                  return $ocLazyLoad.load({
                      files: ['js/controllers/activarCtrl.js']
                  });
              }]
          }
      })
      .state('app.productos', {
        url: '/productos',
        templateUrl: 'views/producto.html',
        controller: 'productoCtrl',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: 'Productos',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            
            return $ocLazyLoad.load({
              files: ['js/controllers/productoCtrl.js']
            });
          }]
        }
      })
      .state('app.productoRegistrar', {
        url: '/producto-registrar',
        templateUrl: 'views/producto-form.html',
        controller: 'productoFormCtrl',
        controllerAs: 'vm',
        params: { subtitle: 'Registrar Producto' },
        ncyBreadcrumb: {
          label: 'Registrar Producto',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            
            return $ocLazyLoad.load({
              files: ['js/controllers/productoFormCtrl.js']
            });
          }]
        }
      })
      .state('app.productoEditar', {
        url: '/producto-editar/:id',
        templateUrl: 'views/producto-form.html',
        controller: 'productoFormCtrl',
        controllerAs: 'vm',
        params: { subtitle: 'Editar  Producto' },
        ncyBreadcrumb: {
          label: 'Editar  Producto',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            
            return $ocLazyLoad.load({
              files: ['js/controllers/productoFormCtrl.js']
            });
          }]
        }
      })
     

  }]);
