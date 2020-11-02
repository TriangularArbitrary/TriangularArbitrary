import { Component, OnInit } from '@angular/core';
import { LocalStorageKeys } from '../Enums/Enums';
import { Movers, MoversWithTimestamp } from '../Models/Movers';
import { YahooFinanceService } from '../Services/yahoo-finance.service';

@Component({
  selector: 'app-top-ten',
  templateUrl: './top-ten.component.html',
  styleUrls: ['./top-ten.component.css']
})
export class TopTenComponent implements OnInit {

  constructor(private serv: YahooFinanceService) {}

  movers: Movers[] = [];
  topten: Movers[] = [];
  previous: MoversWithTimestamp;

  ngOnInit(): void {
  }

  getMovers() {
    this.movers=[];
    this.topten=[];
    if (this.eligibleForRequery()) {
      this.queryMovers()
    }
    else {
      alert("Data has not changed since previous query.")
      this.topten=this.previous.list;
    }
  }

  queryMovers() {
    this.serv.getMovers().subscribe (
      (response) => {
        let data:Object[] = response['quotes'];
        data.forEach( (element) => {
          this.movers.push(new Movers(element['symbol'],
          element['shortName'],element['regularMarketPrice'],
          element['regularMarketChange'],element['regularMarketChangePercent'],
          element['fiftyTwoWeekRange']));
        });

      var i:number;
      for(i=0;i<10;i++) {
        this.topten.push(this.movers[i]);
      }
      console.log(this.topten);
      this.setStorage()
      },
      (error) => {console.log(error)}
      );
  }

  eligibleForRequery() {
    let now = new Date();
    console.log(this.previous)
    this.getFromStorage();
    if(this.timeComparison(this.previous.timestamp,now)>2) return true;
    else return false;

  }

  timeComparison(date1:Date, date2:Date) {
    let time1:number = new Date(date1).getTime();
    let time2:number = new Date(date2).getTime();
    let toReturn:number = Math.abs(((time1 - time2) / 1000) / 60);
    console.log("Difference in mins: " + toReturn);
    return toReturn;
  }

  getFromStorage() {
    this.previous = JSON.parse(localStorage.getItem(LocalStorageKeys.TopTen));
    console.log("Successfully retrieved: " + this.previous)
  }

  setStorage() {
    let toSet:MoversWithTimestamp = new MoversWithTimestamp(new Date(), this.topten);
    localStorage.setItem(LocalStorageKeys.TopTen, JSON.stringify(toSet));
    console.log("Successfully stored: " + toSet)
  }
}
