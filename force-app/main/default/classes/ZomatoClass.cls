global class ZomatoClass {
    
    
    //Used to get entityId and entityType
    @AuraEnabled
    public static String getLocation(String locationName) {   
        
        String reponse;
        
        List<ZomatoLocation.Location_suggestions> locationList = new List<ZomatoLocation.Location_suggestions>();
        List<string> locationList1 = new List<string>();
        // Instantiate a new http object
        Http h = new Http();
        String url = 'https://developers.zomato.com/api/v2.1/locations';
        url += '?query='+locationName.deleteWhitespace();
        
        // Instantiate a new HTTP request, specify the method (GET) as well as the endpoint
        HttpRequest req = new HttpRequest();
        req.setEndpoint(url);
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('user-key', '01f78b525bb10b784bca3df514f66019');
        req.setMethod('GET');
        
        // Send the request, and return a response
        HttpResponse res = h.send(req);
        system.debug('response:::::'+res.getBody());
        reponse = res.getBody();
        //return res.getBody();
        if(res.getStatusCode() == 200){
            system.debug('Status::::::::'+res.getStatus());
            
            ZomatoLocation.Location_suggestions locationClass = new ZomatoLocation.Location_suggestions();
            
            ZomatoLocation jsonApex = ZomatoLocation.parse(reponse);
            
            system.debug('jsonApex::::::'+jsonApex.Location_suggestions);
            
            for(ZomatoLocation.Location_suggestions loc : jsonApex.Location_suggestions){
                System.debug('location details'+loc);
                //System.debug('Categories:' + category.Categories.id+':'+category.Categories.name);
                locationList.add(loc);
            }
            system.debug('locationList'+locationList);
        }
        system.debug('locationList222'+locationList);
        String locationString = System.JSON.serialize(locationList);
        return locationString;
        
    }
    
    
    @AuraEnabled
    public static String searchRestaurants(string entityId, string entityType, string searchTerm) {   
        string reponse;
        System.debug('Data::::'+ entityId+''+entityType+''+searchTerm);
        List<ZomatoSearch.Restaurants> restaurantsList = new List<ZomatoSearch.Restaurants>();
        // Instantiate a new http object
        Http h = new Http();
        String url = 'https://developers.zomato.com/api/v2.1/search';
        url += '?entity_id='+ entityId;
        url += '&entity_type='+ entityType;
        url += '&q='+searchTerm;
        
        // Instantiate a new HTTP request, specify the method (GET) as well as the endpoint
        HttpRequest req = new HttpRequest();
        req.setEndpoint(url);
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('user-key', '01f78b525bb10b784bca3df514f66019');
        req.setMethod('GET');
        
        // Send the request, and return a response
        HttpResponse res = h.send(req);
        system.debug('response:::::'+res.getBody());
        reponse = res.getBody();
        //return res.getBody();
        //locationDetailsList = new List<locationDetails.Best_rated_restaurants>();
        if(res.getStatusCode() == 200){
            system.debug('Status::::::::'+res.getStatus());
            
            //string strResponse = reponse.replace('Currency', 'myCurrency');
            //System.debug('strResponse:::::'+strResponse);
            
            ZomatoSearch jsonApex = ZomatoSearch.parse(res.getBody());
            
            system.debug('jsonApex::::::'+jsonApex);
            
            for(ZomatoSearch.Restaurants rest : jsonApex.restaurants){
                System.debug('Restaurants:::::'+rest.Restaurant.name);
                //System.debug('Categories:' + category.Categories.id+':'+category.Categories.name);
                restaurantsList.add(rest);
            }
            system.debug('restaurantsList::::'+restaurantsList);
        }
        String restaurantString = System.JSON.serialize(restaurantsList);
        return restaurantString;
    } 
}