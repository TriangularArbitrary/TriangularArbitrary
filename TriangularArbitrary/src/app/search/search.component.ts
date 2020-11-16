import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Stock } from '../Models/Stock';
import { AccountService } from '../Services/account.service';
import { AlphaVantageService } from '../Services/alpha-vantage.service';
import { FavoritesStorageService } from '../Services/favorites-storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Input() stocks: Stock[] = [];
  symbol: string;
  textColor: string;

  constructor(
    private serv: AlphaVantageService,
    private favServ: FavoritesStorageService,
    private toastr: ToastrService,
    private accServ: AccountService
  ) {}

  ngOnInit(): void {
     let stock = this.favServ.lastStock;
     if(stock != undefined && stock != null) {
       this.setTextColor(parseFloat(stock.change));
       this.stocks.push(stock);
     }
  }

  getStocks(): void {
    this.serv.getStocks(this.symbol).subscribe(
      (response) => {
        let data = response['Global Quote'];
        if (this.isEmpty(data)) {
          this.toastr.info("no stocks matching " + this.symbol);
          return;
        }
        this.setTextColor(data['09. change'])
        let newStock = new Stock(
          data['01. symbol'],
          data['02. open'],
          data['03. high'],
          data['04. low'],
          data['05. price'],
          data['06. volume'],
          data['07. latest trading day'],
          data['08. previous close'],
          data['09. change'],
          data['10. change percent']
        );
        this.stocks = [];
        this.stocks.push(newStock);
        this.favServ.lastStock = newStock;
      },
      (error) => console.log(error)
    );
  }

  async addFavorite(symbol: string) {
    if ((await this.checkDuplicates(symbol)) === true) {
      this.toastr.info(symbol + " is already favorited!")
      return;
    }
    this.favServ.saveFavorite(symbol, this.accServ.getUserAccount().email);
    this.toastr.info('Added ' + symbol + ' to favorites');
  }

  setTextColor(change: number) {
    if(change < 0) {
      this.textColor = 'red';
    }
    else {
      this.textColor = 'green';
    }
  }

  isEmpty(obj: any) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  async checkDuplicates(symbol: string): Promise<boolean> {
    let currentFavs = await this.favServ.getAllFavorites(this.accServ.getUserAccount().email);
    if (currentFavs !== null) {
      for (var i = 0; i < currentFavs.length; i++) {
        if (currentFavs[i] === symbol) {
          return true;
        }
      }
    }
    return false;
  }
}
