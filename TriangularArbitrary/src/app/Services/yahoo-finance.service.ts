import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YahooFinanceService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
   }

   getMovers() {
    let headers = new HttpHeaders().set('x-rapidapi-host','yahoo-finance15.p.rapidapi.com').set('x-rapidapi-key','dab15a3f9cmshddce05f66ea95dcp13569ejsn701258d7a016');
    return this.http.get("https://yahoo-finance15.p.rapidapi.com/api/yahoo/mu/topmutualfunds?start=0", {headers});
  }


}
