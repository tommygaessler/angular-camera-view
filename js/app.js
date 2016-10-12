(function() {
  'use strict';

  var app = angular.module('cameraApp', []);

  app.filter('stars', function() {

    return function(rating) {

      if(rating === 1) {
        return '*';
      } else if(rating === 2) {
        return '**';
      } else if (rating === 3) {
        return '***';
      } else if (rating === 4) {
        return '****';
      } else if (rating === 5) {
        return '*****';
      }
    }
  });

  app.controller('cameras', function($scope) {
    $scope.cameras = [
      {
        id: 1,name: 'Nikon D3100 DSLR',image: 'http://ecx.images-amazon.com/images/I/713u2gDQqML._SX522_.jpg',rating: 4,price: 369.99,onSale: true
      },
      {
        id: 2,name: 'Canon EOS 70D',image: 'http://ecx.images-amazon.com/images/I/81U00AkAUWL._SX522_.jpg',rating: 2,price: 1099.0,onSale: false
      },
      {
        id: 3,name: 'Nikon D810A',image:'http://ecx.images-amazon.com/images/I/91wtXIfLl2L._SX522_.jpg',rating: 3,price: 3796.95,onSale: true
      }
    ]
  });

  app.controller('cart', function($scope) {

    $scope.sort = 'name';

    $scope.count = 0;
    $scope.subtotal = 0;
    $scope.tax = 0;
    $scope.total = 0;
    $scope.camerasInCart = [];

    $scope.cart = function(camera, price) {

      var isThere = false;
      var index = 0;

      $scope.camerasInCart.forEach(function(item, i) {
        if (camera === item.camera) {
          isThere = true;
          index = i;
        }
      });
      if (isThere) {
        $scope.camerasInCart[index].amount += 1;
      } else {
        $scope.camerasInCart.push({camera:camera, amount:1, price:price});
      }

      $scope.subtotal += price;
      $scope.tax += .07 * price;
      $scope.total += price + $scope.tax;
    };
    $scope.delete = function($index) {

      console.log();
      // console.log($scope.camerasInCart[$index].price);
      var amount = $scope.camerasInCart[$index].amount;

      $scope.subtotal -= $scope.camerasInCart[$index].price * amount;
      $scope.tax = .07 * $scope.subtotal;
      $scope.total = $scope.subtotal + $scope.tax;

      $scope.camerasInCart.splice($index, 1);
    };
  });

  $('select').material_select();

})();
