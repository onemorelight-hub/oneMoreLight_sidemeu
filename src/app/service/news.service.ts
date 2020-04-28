import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import { apiGatewayUrl } from '../shared/baseUrl' 
import { CatagoryService } from '../service/catagory.service'
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  currentCatagory : string;
  locationCode : string;
  constructor(private httpClient : HttpClient,
     private catagoryService: CatagoryService,) {
       this.catagoryService.catagory.subscribe((data)=>{
         this.currentCatagory = data;
       })
  }
  
  data: any;
  getTopNews(location): Observable<any>{
    
    this.locationCode = this.getLocationCode(location);
    
    switch(this.currentCatagory){
      case "Top": 
      var url = apiGatewayUrl+ '/news/'+ this.locationCode +'/topnews';
      break;
      case "Business": 
      var url = apiGatewayUrl+ '/news/' + this.locationCode + '/businessNews';
      break;
      case "Health": 
      var url = apiGatewayUrl+ '/news/' + this.locationCode + '/healthNews';
      break;
      case "Sports": 
      var url = apiGatewayUrl+ '/news/' + this.locationCode + '/sportsNews';
      break;
      case "Science": 
      var url = apiGatewayUrl+ '/news/' + this.locationCode + '/scienceNews';
      break;
      case "Technology": 
      var url = apiGatewayUrl+ '/news/' + this.locationCode + '/technologyNews';
      break;
      case "Entertainment": 
      var url = apiGatewayUrl+ '/news/' + this.locationCode + '/entertainmentNews';
      break;
    }
    return this.httpClient.get(url);
  }

  getNews(options, location): Observable<any>{ 
    this.locationCode = this.getLocationCode(location);
    switch(this.currentCatagory){
      
      case "Top": 
      var url = apiGatewayUrl+ '/news/'+ this.locationCode + '/expl-top-news';
      break;
      case "Business": 
      var url = apiGatewayUrl+ '/news/'+ this.locationCode + '/expl-business-news';
      break;
      case "Health": 
      var url = apiGatewayUrl+ '/news/'+ this.locationCode + '/expl-health-news';
      break;
      case "Sports": 
      var url = apiGatewayUrl+ '/news/'+ this.locationCode + '/expl-sports-news';
      break;
      case "Science": 
      var url = apiGatewayUrl+ '/news/'+ this.locationCode + '/expl-science-news';
      break;
      case "Technology": 
      var url = apiGatewayUrl+ '/news/'+ this.locationCode + '/expl-technology-news';
      break;
      case "Entertainment": 
      var url = apiGatewayUrl+ '/news/'+ this.locationCode + '/expl-entertainment-news';
      break;
    }
    console.log(url);
    console.log('Checking the options: '+JSON.stringify(options));
    return this.httpClient.post(url,options);
  }

  getLocationCode(location): string{
    switch(location){
        case 'India'        : return 'in';
        case 'USA'          : return 'us';
        case 'UK'           : return 'uk';
        case 'Australia'    : return 'au';
        case 'Canada'       : return 'ca';
        case 'Ireland'      : return 'ir';
        case 'Malaysia'     : return 'ma';
        case 'New Zealand'  : return 'nz';
        case 'Saudi Arabia' : return 'sau';
        case 'South Africa' : return 'sa';
        default             : return 'in';
    }
  }
}
