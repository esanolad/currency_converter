


adminApp.controller('ctrl', function ($scope, $http, country, currency) {
	$scope.currencyList=currency;
	$scope.countryList=country;
	$scope.convert = function(){
		//console.log($scope.amount)
		fromCurrency = encodeURIComponent($scope.fromCountry);
		toCurrency = encodeURIComponent($scope.toCountry);
		amount=encodeURIComponent($scope.amount)
		var query = fromCurrency + '_' + toCurrency; 
		var url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=y`;
		$http.get(url).then((response)=>{
			rate=response.data[query].val;
			result = amount*rate
			console.log(result)
			$scope.result=result;
			$scope.rate=rate
		});
		
	}
});


