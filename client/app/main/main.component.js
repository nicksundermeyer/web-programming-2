import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  /*@ngInject*/
  constructor($http, User) {
    this.$http = $http;
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
        this.users = response.data;
      })
      .catch(error => {
        console.error(error);
      })
  }
}

export default angular.module('comp3705App.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'mainController'
  })
  .service('User', UserService)
  .filter('Square', SquareFilter)
  .name;

// function which provides service for retrieving users
export function UserService($http) {
  'ngInject';
  var User = {
    getAllUsers() {
      return $http.get('/api/users/');
    },
    getUserByID(id) {
      return $http.get('/api/users/' + id);
    }
  }
  return User;
}

// filter to square number
export function SquareFilter() {
  var squareFunction = function (value) {
    return value * value;
  }
  return squareFunction;
}