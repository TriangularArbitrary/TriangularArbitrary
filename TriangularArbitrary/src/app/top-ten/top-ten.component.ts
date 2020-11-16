import { Component, OnInit } from '@angular/core';
import { LocalStorageKeys } from '../Enums/Enums';
import { Movers, MoversList } from '../Models/Movers';
import { YahooFinanceService } from '../Services/yahoo-finance.service';

@Component({
  selector: 'app-top-ten',
  templateUrl: './top-ten.component.html',
  styleUrls: ['./top-ten.component.css']
})
export class TopTenComponent implements OnInit {

  constructor(private serv: YahooFinanceService) {}

  topten: Movers[] = [];

  ngOnInit(): void {
    this.topten=[];
    var list = this.getListFromStorage();
    console.log("Loaded on init:" + list);
    if (list != null) this.topten=list.list;

  }

  getMovers() {
    this.topten=[];
    this.queryMovers();
  }

  addToArray(conversion:Movers) {
    if (this.topten.length<10) {
      this.topten.push(conversion);
      //console.log(this.topten)
      this.setListToStorage()
    }
  }

  queryMovers() {
    this.serv.getMovers().subscribe (
      (response) => {
        let data:Object[] = response['quotes'];
        var i:number;
        data.forEach( (element) => {
          this.addToArray(new Movers(element['symbol'],
          element['shortName'],element['regularMarketPrice'],
          element['regularMarketChange'],element['regularMarketChangePercent'],
          element['fiftyTwoWeekRange']));
        });
        //console.log(this.topten);
      },
      (error) => {
        console.log(error);
        alert("Too many requests, please wait a minute before trying again.");
      });
  }

  getListFromStorage():MoversList {
    let list:MoversList = JSON.parse(localStorage.getItem(LocalStorageKeys.TopTen));
    console.log("Successfully retrieved: " + list);
    return list;
  }

  setListToStorage() {
    let toSet:MoversList = new MoversList(this.topten);
    localStorage.setItem(LocalStorageKeys.TopTen, JSON.stringify(toSet));
    console.log("Successfully stored: " + toSet.list)
  }
}
