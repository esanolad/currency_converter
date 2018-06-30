
var adminApp = angular.module('currencyConverter', [
	'ui.router',
	'currencyConverter.posts'
]);

adminApp.config(function($stateProvider){
	$stateProvider
		.state('post', {
			url: '/',
			templateUrl: 'script/head.html',
			resolve: {
				/*
				currency: function(Posts){
					return Posts.currencies().then(function(data){
						//console.log(data);
						return data;
					}); 
				}, */
				country: function(Posts){
					return Posts.countries().then(function(data){
						//console.log(data);
						return data;
					}); 
				}
			},
			controller: 'ctrl'
		})
		
});

