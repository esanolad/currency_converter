
var postsModule = angular.module('currencyConverter.posts', []);

postsModule.service('Posts', function($http){
	return {
		currencies: function(){
			return $http.get("https://free.currencyconverterapi.com/api/v5/currencies")
				.then(function(response){
				return response.data.results;
			});
		},
		countries: function(){
			return $http.get("https://free.currencyconverterapi.com/api/v5/countries")
				.then(function(response){
				return response.data.results;
			});
		}
		
	};
});

