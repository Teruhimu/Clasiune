(function(){
    'use strict';

    angular
        .module('app')
        .controller('testFormCtrl', testFormCtrl)

    testFormCtrl.$inject = ['dataService','toastr','$state','$stateParams', '$auth'];

    function testFormCtrl(dataService,toastr,$state,$stateParams,$auth) {
        /* jshint validthis:true */
        var vm = this;

        vm.test = {};
        vm.editMode = $state.current.name === 'test-editar' ? true : false;
        vm.subtitle = $state.current.params.subtitle;

        vm.formFields = [{
          className:'row',
          fieldGroup:[
            {
              className: 'col-md-6',
              key: 'testNombre',
              type: 'input',
              templateOptions: {
                type: 'input',
                placeholder: 'Nombre',
                required: true
              }
            },
            {
                className: 'col-md-6',
                key: 'testNumero',
                type: 'input',
                templateOptions: {
                  type: 'number',
                  placeholder: 'Numero',
                  required: true
                }
              },
              
          
          ]
        }
          
          
        ];

        activate();

        function findtestById() {
          return dataService.findByPk('test', $stateParams.id)
          .then(function(result) {
              return result;
          })
          .finally(function() {
              vm.dataLoading = false;
          });
        } 
        function activate() { 
          if($stateParams.id) {
            vm.dataLoading = true;
            findtestById()
              .then(function(result) {
                  if (result.success) {
                      console.log('result.data :>> ', result.data);
                      result.data.testNumero = parseFloat(result.data.testNumero);
                      vm.test = result.data;
                  } else {
                     console.log('Error en findtestById');
                  }
              });
         }
        }

        vm.grabar = function (test) {
            vm.dataSaving = true;

            
            if ($stateParams.id) {
              dataService.update('test',$stateParams.id, test)  
              .then(function(result) {
                  if (result.success) {
                      toastr.success('test actualizado con éxito', 'Aviso');
                      $state.go('app.test'); //dirige a la pantalla indicada  (ejemplo: main, test, producto)
                  } else {
                      toastr.error(result.message, 'Aviso');
                  }
              })
              .finally(function() {
                  vm.dataSaving = false;
              });
            }else{
                let payload = $auth.getPayload();
                let usuarioId = payload.usuarioId;
                test.usuarioId = usuarioId;
              dataService.create('test', test)  
                  .then(function(result) {
                      if (result.success) {
                          toastr.success('test grabado con éxito', 'Aviso');
                          $state.go('app.test'); //dirige a la pantalla indicada  (ejemplo: main, test, producto)
                      } else {
                          toastr.error(result.message, 'Aviso');
                      }
                  })
                  .finally(function() {
                      vm.dataSaving = false;
                  });
            }
              
            
        } 
    }
})();