(function(){
    'use strict';

    angular
        .module('app')
        .controller('productoFormCtrl', productoFormCtrl)

    productoFormCtrl.$inject = ['dataService','toastr','$state','$stateParams', '$auth'];

    function productoFormCtrl(dataService,toastr,$state,$stateParams,$auth) {
        /* jshint validthis:true */
        var vm = this;

        vm.producto = {};
        vm.editMode = $state.current.name === 'producto-editar' ? true : false;
        vm.subtitle = $state.current.params.subtitle;

        vm.formFields = [{
          className:'row',
          fieldGroup:[
            {
              className: 'col-md-6',
              key: 'productoDenominacion',
              type: 'input',
              templateOptions: {
                type: 'input',
                placeholder: 'Denominación',
                required: true
              }
            },
            {
                className: 'col-md-6',
                key: 'productoPrecio',
                type: 'input',
                templateOptions: {
                  type: 'number',
                  placeholder: 'Precio',
                  required: true
                }
              },
              {
                className: 'col-md-6',
                key: 'productoDescripcion',
                type: 'textarea',
                templateOptions: {
                  rows: 3,
                  placeholder: 'Descripcion',
                  required: false
                }
              },
          
          ]
        }
          
          
        ];

        activate();

        function findProductoById() {
          return dataService.findByPk('producto', $stateParams.id)
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
            findProductoById()
              .then(function(result) {
                  if (result.success) {
                      console.log('result.data :>> ', result.data);
                      result.data.productoPrecio = parseFloat(result.data.productoPrecio);
                      vm.producto = result.data;
                  } else {
                     console.log('Error en findProductoById');
                  }
              });
         }
        }

        vm.grabar = function (producto) {
            vm.dataSaving = true;

            
            if ($stateParams.id) {
              dataService.update('producto',$stateParams.id, producto)  
              .then(function(result) {
                  if (result.success) {
                      toastr.success('Producto actualizado con éxito', 'Aviso');
                      $state.go('app.main');
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
                producto.usuarioId = usuarioId;
              dataService.create('producto', producto)  
                  .then(function(result) {
                      if (result.success) {
                          toastr.success('Producto grabado con éxito', 'Aviso');
                          $state.go('app.main');
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