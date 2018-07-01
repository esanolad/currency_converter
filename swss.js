
let CACHE_NAME = "currency_cache_v1";
//let idb = require('idb');
console.log(idb)
let urlsToCache = [
  '/index.html',
  '/css/semantic.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular.js',
  'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.js',
  'https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wXg.woff2',
  'script/app.js',
  'script/controller.js',
  'script/posts.js',
  'script/idb.js',
  '/sw.js',
  'script/head.html'
    ];
self.addEventListener('install', function (event){
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache)=>{
      console.log('cache opened');
      return cache.addAll(urlsToCache);
    })
  );
});

function idbMs(rate='') {
  //let idb = require('idb');
  let dbPromise = idb.open('currency', 1);
  if (rate!=''){
    return dbPromise.then((db) =>{
      let tx = db.transaction('rate').objectStore('rate');
          return tx.getAll(rate).then( (rateVal) =>{
            //console.log(rateVal);
            return rateVal;
          });
      });
  }
  return dbPromise.then( (db) =>{
    let tx = db.transaction('currencyList').objectStore('currencyList');
    return tx.getAll().then((currency)=> {
        return currency;
    });
  });
} 
self.addEventListener('fetch',  (event) =>{
    //console.log("event.request");
    //console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then( (response) =>{
            if (response) {
                return response;
            }
            let fetchRequest = event.request.clone();
            return fetch(fetchRequest).then((response) =>{
                //console.log(response)
                
                let responseToCache = response.clone();

                caches.open(CACHE_NAME).then( (cache) =>{
                    //cache.put(event.request, responseToCache);
                })
                
                return response;
            }).catch(function (err){
                //NOT CONNECTED TO SERVER
                if (fetchRequest.url.startsWith('https://free.currencyconverterapi.com/api/v5/convert')) {
                    
                    let url = fetchRequest.url;
                    let query =url.substr(url.indexOf('=') + 1,7);
                    console.log(query)
                    console.log("Fetch from IDB")
                    return idbMs(query).then( (val)=> {
                      const rateVal={}
                      rateVal[query]=val[0]

                      return currList=new Response(JSON.stringify(rateVal));
                    });
                } 
                if (fetchRequest.url.startsWith('https://free.currencyconverterapi.com/api/v5/countries')) {
                    
                  console.log("Fetching from IDB...")
                  //console.log(res)
                    return idbMs().then((cur)=> {
                      return currList=new Response(JSON.stringify(cur));
                    });
                    
                    
                } 
                
            });
        }) 
    ) 
})

