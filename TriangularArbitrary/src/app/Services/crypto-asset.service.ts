import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoAssetService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
   }

   getCrypto(symbol: string, currency: string) {
    let headers = new HttpHeaders()
      .set('x-api-key', 'Vhcl75IoYr5JhVxiaYHArbQydrj0ax')
      .set('x-api-secret', 'BiXE5D7gpAW0Wr3iQoTKp8lwHcNwIyyuscYhIzdKYL6lm')
      .set('x-rapidapi-host','crypto-asset-market-data-unified-apis-for-professionals.p.rapidapi.com')
      .set('x-rapidapi-key','dab15a3f9cmshddce05f66ea95dcp13569ejsn701258d7a016');
    return this.http.get("https://crypto-asset-market-data-unified-apis-for-professionals.p.rapidapi.com/api/v1/exchanges/trades?exchange=Kraken&asset=BTC&denominator=USD",{ headers });
  }

}
