import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Currencies, LocalStorageKeys } from '../Enums/Enums';
import { CurrencyConversion, CurrencyConversionWithTimestamp } from '../Models/CurrencyConversion';
import { AlphaVantageService } from '../Services/alpha-vantage.service';


export class Money{
  fromCurrency: string;
  toCurrency: string;
}


@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.css']
})
export class ConversionComponent implements OnInit {

  constructor(private serv: AlphaVantageService) {}

  conversions: CurrencyConversion[] = [];

  money = new Money;
  currencies:string[] = [
    'USD',
    'EUR',
    'JPY',
    'GBP',
    'AUD',
    'NZD',
    'HKD',
    'CHF',
    'CAD'
  ];

  noData: string = '';
  conversionForm: FormGroup;


  ngOnInit(): void {
    this.conversionForm = new FormGroup({
      from: new FormControl(this.money.fromCurrency, [Validators.required]),
      to: new FormControl(this.money.toCurrency, [Validators.required])
    });

  }

  isEmpty(obj: any) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  getFromStorage() {
    let retrieved:CurrencyConversionWithTimestamp = JSON.parse(localStorage.getItem(LocalStorageKeys.Conversions));
    this.conversions = retrieved.list;
    console.log("Successfully retrieved: " + this.conversions)
  }

  setStorage() {
    let toSet:CurrencyConversionWithTimestamp = new CurrencyConversionWithTimestamp(new Date(), this.conversions);
    localStorage.setItem(LocalStorageKeys.Conversions, JSON.stringify(toSet));
    console.log("Successfully stored: " + toSet)
  }

  getConversions():void {
    this.serv.getCurrencyExchange(this.money.toCurrency,this.money.fromCurrency).subscribe
    (
      (response) => {


        let data = response['Realtime Currency Exchange Rate'];
        console.log(data);

        let newConversion = new CurrencyConversion(data['1. From_Currency Code'],data['2. From_Currency Name'],data['3. To_Currency Code'],
          data['4. To_Currency Name'],data['5. Exchange Rate'],data['6. Last Refreshed'],data['7. Time Zone'],data['8. Bid Price'],
          data['9. Ask Price']);
        console.log(newConversion);
        this.conversions.push(newConversion);
        console.log(this.conversions);
      },
      (error) => {
        console.log(error);
        alert("Too many requests, please wait a minute before trying again.")
      }
    )
  }
}
