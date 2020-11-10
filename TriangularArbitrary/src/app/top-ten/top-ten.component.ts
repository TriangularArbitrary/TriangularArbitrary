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

  movers: Movers[] = [];
  topten: Movers[] = [];
  previous: Date;

  ngOnInit(): void {
    this.topten=[];
    var list = this.getListFromStorage();
    console.log("Loaded on init:" + list);
    if (list != null) this.topten=list.list;

  }

  getMovers() {
    if (this.eligibleForRequery()) {
      this.movers=[];
      this.topten=[];
      this.queryMovers();
    }
    else {
      alert("Data has not changed since previous query.")
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
          console.log(response);

        });

      var i:number;
      for(i=0;i<10;i++) {
        this.topten.push(this.movers[i]);
      }
      console.log(this.topten);
      this.setListToStorage()
      this.previous = new Date();
      },
      (error) => {console.log(error)}
      );
  }

  eligibleForRequery() {
    let now = new Date();
    console.log(this.previous)
    if(this.topten.length==0 || this.previous==null) return true;
    else if(this.timeComparison(this.previous,now)>2) return true;
    else return false;

  }

  timeComparison(date1:Date, date2:Date) {
    let time1:number = new Date(date1).getTime();
    let time2:number = new Date(date2).getTime();
    let toReturn:number = Math.abs(((time1 - time2) / 1000) / 60);
    console.log("Difference in mins: " + toReturn);
    return toReturn;
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
