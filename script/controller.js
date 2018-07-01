if ('serviceWorker' in navigator) {
	window.addEventListener('load', function(){
	navigator.serviceWorker.register('/sw.js').then((registration)=>{
		console.log('Registration Successful with scope', registration.scope);
	}, (err)=>{
		console.log('Registration Failed', err);
	});
	});
	
}

adminApp.controller('ctrl', function ($scope, $http, country) {
	
	const dbPromise=idb.open('currency',1,(db)=>{
	let store=db.createObjectStore('currencyList', {keyPath:'currencyId'});
	store=db.createObjectStore('rate');
	})
	dbPromise.then((db)=>{
	const tx=db.transaction('currencyList','readwrite')
	store=tx.objectStore('currencyList')
	for (const c in country){
		//console.log(c)
		store.put(country[c])
	}
	return tx.complete;
	}).then(()=>{
	//console.log("Complete");
	})
	
	$scope.countryList=country;
	//console.log(country)
	$scope.convert = function(){
	$scope.showResult=false
	//console.log($scope.amount)
	fromCurrency = encodeURIComponent($scope.fromCountry);
	toCurrency = encodeURIComponent($scope.toCountry);
	amount=encodeURIComponent($scope.amount)
	// console.log(amount)
	if (amount=="undefined") {
		//console.log(amount)
		return
	}
		else {
		const query = fromCurrency + '_' + toCurrency; 
		const query2 = toCurrency + '_' + fromCurrency
		const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;
		$http.get(url).then((response)=>{
		//console.log(response.data)
		const rate=response.data[query];
		//console.log(rate)
		const rate2=1/rate;
		const result = amount*rate
		dbPromise.then((db)=>{
			const tx=db.transaction('rate','readwrite')
			store=tx.objectStore('rate')
			store.put(response.data[query], query);
			store.put(rate2,query2);
			return tx.complete;
		}).then(()=>{
			//console.log("Complete");
		})
		//console.log(result)
		$scope.result=`${result.toFixed(2)}`;
		$scope.rate=rate.toFixed(2)
		$scope.showResult=true
		});

	};
	
	
	}
});