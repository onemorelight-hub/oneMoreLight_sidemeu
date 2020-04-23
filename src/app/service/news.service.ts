import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import { apiGatewayUrl } from '../shared/baseUrl' 
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient : HttpClient) { }
  data: any;
  getTopNews(viewOption): Observable<any>{
    var url = apiGatewayUrl+ '/news/topnews';
    console.log("getTopNews--> ", viewOption)
    console.log(url);

    switch(viewOption){
      case "Top News": 
      var url = apiGatewayUrl+ '/news/in/topnews';
      break;
      case "Business": 
      var url = apiGatewayUrl+ '/news/in/businessNews';
      break;
      case "Health": 
      var url = apiGatewayUrl+ '/news/in/healthNews';
      break;
      case "Sports": 
      var url = apiGatewayUrl+ '/news/in/sportsNews';
      break;
      case "Science": 
      var url = apiGatewayUrl+ '/news/in/scienceNews';
      break;
      case "Technology": 
      var url = apiGatewayUrl+ '/news/in/technologyNews';
      break;
      case "Entertainment": 
      var url = apiGatewayUrl+ '/news/in/entertainmentNews';
      break;
    }
    return this.httpClient.get(url);
  }

  getNews(options, viewOption): Observable<any>{ 
    switch(viewOption){
      case "News": 
      var url = apiGatewayUrl + '/news/in/expl-top-news';
      break;
      case "Business News": 
      var url = apiGatewayUrl + '/news/in/expl-business-news';
      break;
      case "Health News": 
      var url = apiGatewayUrl + '/news/in/expl-health-news';
      break;
      case "Sports News": 
      var url = apiGatewayUrl + '/news/in/expl-sports-news';
      break;
      case "Science News": 
      var url = apiGatewayUrl + '/news/in/expl-science-news';
      break;
      case "Technology News": 
      var url = apiGatewayUrl + '/news/in/expl-technology-news';
      break;
      case "Entertainment News": 
      var url = apiGatewayUrl + '/news/in/expl-entertainment-news';
      break;
    }
    console.log("getNews--> ", viewOption)
    console.log(url);
    console.log('Checking the options: '+JSON.stringify(options));
    return this.httpClient.post(url,options);
  }
}
