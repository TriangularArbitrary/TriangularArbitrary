import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlphaVantageService {

  keys = ["3a817c55c4mshffc3fa4189b8ad3p11a7fajsn7113f1cd4087","eabd6f1d50mshd5adec4f4498824p14f0a8jsn50d4d4ddca7b","d3cf60b0d3msh3c528cb3930b910p18949cjsn95bdb34db2ae"
  ,"d8c2daa417msh5c07760f621b084p1c7e69jsn34d8015c952e","145ded9cfamsh08ed6a4bdb93b21p13450ejsnd8b0546faaf6","2c42f9b7damsh0337a009b8e72f8p15e9d8jsn6f2f2f1c6f70","1eba3876a0msh68dce7c6f2dd412p1885aajsn2b03db874223"];
  rotationCount = 0;
  keyIndex = 0;

 constructor(private http: HttpClient) {

   }

getStocks(symbol: string) {
  var key: string = this.getKey();
  let headers = new HttpHeaders().set('x-rapidapi-host','alpha-vantage.p.rapidapi.com').set('x-rapidapi-key', key);
  return this.http.get("https://alpha-vantage.p.rapidapi.com/query?symbol=" + symbol + "&function=GLOBAL_QUOTE",{ headers });
}

getCurrencyExchange(to:string, from:string) {
  let headers = new HttpHeaders().set('x-rapidapi-host','alpha-vantage.p.rapidapi.com').set('x-rapidapi-key','dab15a3f9cmshddce05f66ea95dcp13569ejsn701258d7a016');
  return this.http.get("https://alpha-vantage.p.rapidapi.com/query?function=CURRENCY_EXCHANGE_RATE&to_currency="+to+"&from_currency="+from, {headers});
}

private getKey(): string {
  if(this.rotationCount === 5) {
    if(this.keyIndex === this.keys.length -1) {
        this.keyIndex = 0;
    }
    else {
        this.keyIndex = this.keyIndex + 1;
    }
    this.rotationCount = 0;
  }
  this.rotationCount = this.rotationCount + 1;
  return this.keys[this.keyIndex];
}

}
