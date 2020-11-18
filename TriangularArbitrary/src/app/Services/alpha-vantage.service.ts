import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class AlphaVantageService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
   }

getStocks(symbol: string) {
  let headers = new HttpHeaders().set('x-rapidapi-host', environment.alphaVantageAPIConfig.xRapidApiHost)
                                 .set('x-rapidapi-key', environment.alphaVantageAPIConfig.xRapidApiKeys[0]);

  return this.http.get("https://alpha-vantage.p.rapidapi.com/query?symbol=" + symbol + "&function=GLOBAL_QUOTE",{ headers });
}

getCurrencyExchange(to:string, from:string) {
  let headers = new HttpHeaders().set('x-rapidapi-host',environment.alphaVantageAPIConfig.xRapidApiHost)
                                 .set('x-rapidapi-key', environment.alphaVantageAPIConfig.xRapidApiKeys[1]);

  return this.http.get("https://alpha-vantage.p.rapidapi.com/query?function=CURRENCY_EXCHANGE_RATE&to_currency="+to+"&from_currency="+from, {headers});
}

}
