'use strict';

/**
 * @ngdoc function
 * @name myNewProjectApp.controller:TaskCtrl
 * @description
 * # TaskCtrl
 * Controller of the myNewProjectApp
 */
angular.module('myNewProjectApp')
  .controller('TaskCtrl', function ($scope, $http, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.taskFunc = {
    	data:{
            task: '',
            scoreOptions: [
                {name: 'A', value: '4'}, //90+
                {name: 'B', value: '3'}, //80
                {name: 'C', value: '2'}, //70
                {name: 'D', value: '1'}, //60
                {name: 'E', value: '0'}  //60-
            ]
        },
    	initFunc: function() {
    		var _self = this;
    		_self.getTask();
    	},
    	getTask: function() {
            var _self = this;
    		$http.get('../api/index.php/Task/getTask?cid='+ $routeParams.taskId)
    		.success(function(data) {
    			if(data.success) {
                    data.item.forEach(function(v, key) {
                        v.localName = v.task_url.substr(v.task_url.lastIndexOf('/')+1);
                    })
                    console.log(data.item);
    				_self.data.task = data.item;
    			}
    		})
    	}
    }
  });
