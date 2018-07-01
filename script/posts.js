
var postsModule = angular.module('currencyConverter.posts', []);

postsModule.service('Posts', function($http){
	return {
		currencies: function(){
			return $http.get("https://free.currencyconverterapi.com/api/v5/currencies")
				.then((response)=>{
					//console.log()
					if (response.data.results) {
						return response.data.results; //api data
					} else
					{
						return response.data //idb data
					}
			});
		},
		countries: function(){
			return $http.get("https://free.currencyconverterapi.com/api/v5/countries")
				.then((response)=>{
					//console.log(response.data)
					if (response.data.results) {
						return response.data.results; //api data
					} else
					{
						return response.data //idb data
					}
					
			});
		}
		
	};
});

