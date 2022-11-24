(function(){
  'use strict';

  angular
      .module('app')
      .controller('mainCtrl', mainCtrl)

  mainCtrl.$inject = ['dataService','toastr','$scope','$uibModal','$auth'];

  function mainCtrl(dataService,toastr,$scope,$uibModal,$auth) {
      /* jshint validthis:true */
      const vm = this;
      let dialog = {};
      vm.productos = []

      activate();

      vm.eliminar = function(productoId) {
    var datos = {
      productoId: productoId
    };

    dialog = $uibModal.open({
              templateUrl: '../../views/common/modal.html',
      controller: ['entidad', activateModal2Ctrl],
      controllerAs: 'vm',
      resolve: {
        entidad: function() {
          return datos;
        },
      },
    });
      };
     
      
      function activateModal2Ctrl(datos) {
          var vm = this;


    vm.confirmar = confirmar;
    var mensaje = 'Producto eliminado con éxito!';
    vm.titulo = 'Pedido de confirmación';

          vm.mensaje = 'Deseas eliminar el Producto?';
    
    
    function confirmar() {
              vm.dataSaving = true;
              
      return dataService
        .delete('producto', datos.productoId)
        .then(function(result) {
          if (result.success) { 

                          toastr.success(mensaje, 'Aviso');
                          vm.dataSaving = false;
            dialog.close();
                          activate()
                  
                          
          } else {
                          toastr.error(result.message, 'Aviso');
            dialog.close();
          }
        })
                 .catch(function(err){
                     console.log('err :>> ', err);
                     toastr.error(err, 'Aviso');
                      dialog.close();
                 })
    }
  }

  vm.vender = function(productoId) {
    var datos = {
      productoId: productoId
    };

    dialog = $uibModal.open({
              templateUrl: '../../views/common/modal.html',
      controller: ['entidad', activateModal3Ctrl],
      controllerAs: 'vm',
      resolve: {
        entidad: function() {
          return datos;
        },
      },
    });
      };
     
      
      function activateModal3Ctrl(datos) {
          var vm = this;


    vm.confirmar = confirmar;
    var mensaje = 'Producto vendido!';
    vm.titulo = 'Pedido de confirmación';

          vm.mensaje = 'Deseas dar como vendido el producto?';
    
    
    function confirmar() {
              vm.dataSaving = true;
              
      return dataService
        .update('producto', datos.productoId, {productoEstado: 0})
        .then(function(result) {
          if (result.success) { 

                          toastr.success(mensaje, 'Aviso');
                          vm.dataSaving = false;
            dialog.close();
                          activate()
                  
                          
          } else {
                          toastr.error(result.message, 'Aviso');
            dialog.close();
          }
        })
                 .catch(function(err){
                     console.log('err :>> ', err);
                     toastr.error(err, 'Aviso');
                      dialog.close();
                 })
    }
  }

      function activate() { 
          getmain();
      }

      function getmain() {
          vm.dataLoading = true;
          let payload = $auth.getPayload();
          let usuarioId = payload.usuarioId;
          return dataService.findAllByFilter("producto-ext-filter",{usuarioId: usuarioId})
              .then(function(result) { 

                  
                  if (result.success) {
                      console.log('tabla',result.data);
                      vm.productos = result.data;    
                  } else {
                      toastr.error(result.message,'Error');
                  }
              })
              .finally(function() {
                  vm.dataLoading = false;
              });
      }
  }
})();