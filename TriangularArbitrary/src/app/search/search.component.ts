import { Component, OnInit } from '@angular/core';
import { LocalStorageKeys } from '../Enums/Enums';
import { Stock } from '../Models/Stock';
import { AlphaVantageService } from '../Services/alpha-vantage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  stocks: Stock[] = [];
  symbol: string;
  noData: string = '';


  constructor(private serv: AlphaVantageService) {}

  ngOnInit(): void {

  }

  getStocks(): void {
    this.serv.getStocks(this.symbol).subscribe
    (
      (response)=>
      {
        let data = response['Global Quote'];
        if(this.isEmpty(data)) {
        this.noData = 'No stocks matching ' + this.symbol;
        return;
      }
        let newStock = new Stock(data['01. symbol'],data['02. open'],data['03. high'], data['04. low'],data['05. price'],data['06. volume'],data['07. latest trading day']
        ,data['08. previous close'], data['09. change'],data['10. change percent']);
        this.stocks = [];
        this.stocks.push(newStock);
        this.noData = '';
      },
      (error) => console.log(error)
    )
  }

  addFavorite(symbol: string) {
    if(this.checkDuplicates(symbol) === true) {
      alert(symbol + " is already in your favorites");
      return;
    }
    let currentFavs: string[] = JSON.parse(localStorage.getItem(LocalStorageKeys.Favorites));
    currentFavs != null ? currentFavs.push(symbol) : currentFavs = [symbol];
    localStorage.setItem(LocalStorageKeys.Favorites, JSON.stringify(currentFavs));
    alert("Added " + symbol + " to favorites")
  }

  isEmpty(obj: any) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

checkDuplicates(symbol: string): boolean {
  let currentFavs: string[] = JSON.parse(localStorage.getItem(LocalStorageKeys.Favorites));
  if(currentFavs !== null) {
    for(var i=0;i<currentFavs.length;i++) {
      if(currentFavs[i] ===symbol) {
      return true;
      }
    }
  }
  return false;
}


}
