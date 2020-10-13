import { Component, OnInit } from '@angular/core';
import { LocalStorageKeys } from '../Enums/Enums';
import { Stock } from '../Models/Stock';
import { AlphaVantageService } from '../Services/alpha-vantage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  stocks: Stock[] = [];
  favs = JSON.parse(localStorage.getItem(LocalStorageKeys.Favorites)) as string[];

  constructor(private serv: AlphaVantageService) { }

  ngOnInit(): void {
    this.loadFavorites();
  }


  loadFavorites() {
    let currentFavs: string[] = JSON.parse(localStorage.getItem(LocalStorageKeys.Favorites));
    if(currentFavs != null) {
      this.favs = currentFavs;
      for(var i = 0; i<currentFavs.length; i++) {
        this.retrieveStock(currentFavs[i]);
    }
   }
  }

  refreshData() {
    let copy: Stock[] = this.stocks;
    this.stocks = [];
    for(var i = 0; i<copy.length; i++) {
      let stock: Stock = copy[i];
      this.retrieveStock(stock.symbol);
    }
  }

  retrieveStock(symbol: string) {
    console.log(symbol);
    this.serv.getStocks(symbol).subscribe
    (
      (response)=>
      {
        let data = response['Global Quote'];
        let newStock = new Stock(data['01. symbol'],data['02. open'],data['03. high'], data['04. low'],data['05. price'],data['06. volume'],data['07. latest trading day']
        ,data['08. previous close'], data['09. change'],data['10. change percent']);
        this.stocks.push(newStock);
      },
      (error) => console.log(error)
    )
  }

  deleteFavorite(stock: Stock) {
    this.stocks.splice(this.stocks.indexOf(stock), 1);
    this.favs.splice(this.favs.indexOf(stock.symbol), 1);
    localStorage.setItem(LocalStorageKeys.Favorites, JSON.stringify(this.favs));
    alert("deleted " + stock.symbol + " from favorites")
  }

}
