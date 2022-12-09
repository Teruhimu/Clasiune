(function(){
  'use strict';

  angular
      .module('app')
      .controller('testCtrl', testCtrl)

  testCtrl.$inject = ['dataService','toastr','$scope','$uibModal'];

  function testCtrl(dataService,toastr,$scope,$uibModal) {
      /* jshint validthis:true */
      const vm = this;
      let dialog = {};
      vm.tests = []

      activate();

      vm.eliminar = function(testId) {
    var datos = {
      testId: testId
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
    var mensaje = 'test eliminado con éxito!';
    vm.titulo = 'Pedido de confirmación';

          vm.mensaje = 'Deseas eliminar el test?';
    
    
    function confirmar() {
              vm.dataSaving = true;
              
      return dataService
        .delete('test', datos.testId)
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
          return dataService.findAll("test")
              .then(function(result) { 

                  
                  if (result.success) {
                      console.log('tabla',result.data);
                      vm.tests = result.data;    
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