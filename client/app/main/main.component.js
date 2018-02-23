import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  /*@ngInject*/
  constructor($http, User, $uibModal) {
    this.$http = $http;
    this.$uibModal = $uibModal;
    this.User = User;
    this.setData();
    this.getUserData();
  }

  setData() {
    this.values = ['first', 'second', 'third'];
    this.valueToSquare = 4;
  }

  getUserData() {
    // important to use => with promise chain to correctly scope function
    // in this case, makes sure function is in same scope as Controller
    this.User.getAllUsers()
      .then(response => {
        this.users = response;
      })
      .catch(error => {
        console.error(error);
      })
  }

  updateUser(user) {
    this.$uibModal.open({
      template: require('../../components/updateUserModal/updateUserModal.html'),
      controller: 'updateUserController as updateUserController',
      resolve: {
        user: () => user
      }
    })
  }

  createUser(user) {
    this.$uibModal.open({
      template: require('../../components/createUserModal/createUserModal.html'),
      controller: 'createUserController as createUserController',
      resolve: {
        user: () => user
      }
    })
  }
}

function AccordionDemoCtrl($scope) {
  $scope.oneAtATime = true;

  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function () {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: true,
    isFirstDisabled: false
  };
}

AccordionDemoCtrl.$inject = ["$scope"];

export default angular.module('comp3705App.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'mainController'
  })
  .controller('AccordionDemoCtrl', AccordionDemoCtrl)
  .filter('Square', SquareFilter)
  .name;

// filter to square number
export function SquareFilter() {
  var squareFunction = function (value) {
    return value * value;
  }
  return squareFunction;
}