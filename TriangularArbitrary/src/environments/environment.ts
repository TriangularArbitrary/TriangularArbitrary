// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAGVrbwqSR3WZjlUpL_13y7lLDe8e1kYWA",
    authDomain: "triangulararbitrary.firebaseapp.com",
    databaseURL: "https://triangulararbitrary.firebaseio.com",
    projectId: "triangulararbitrary",
    storageBucket: "triangulararbitrary.appspot.com",
    messagingSenderId: "991332102738",
    appId: "1:991332102738:web:1399c62301d65b001fe58b",
    measurementId: "G-QRJ5RJR3F8"
  },
  cryptoAPIConfig: {
    xApiKey: 'Vhcl75IoYr5JhVxiaYHArbQydrj0ax',
    xApiSecret: 'BiXE5D7gpAW0Wr3iQoTKp8lwHcNwIyyuscYhIzdKYL6lm',
    xApiRapidApiHost:'crypto-asset-market-data-unified-apis-for-professionals.p.rapidapi.com',
    xRapidApiKey:'dab15a3f9cmshddce05f66ea95dcp13569ejsn701258d7a016'
  },
  yahooAPIConfig: {
    xRapidApiHost: 'yahoo-finance15.p.rapidapi.com',
    xRapidApiKey: 'dab15a3f9cmshddce05f66ea95dcp13569ejsn701258d7a016'
  },
  alphaVantageAPIConfig: {
    xRapidApiHost: 'alpha-vantage.p.rapidapi.com',
    xRapidApiKeys: ['3a817c55c4mshffc3fa4189b8ad3p11a7fajsn7113f1cd4087', 'dab15a3f9cmshddce05f66ea95dcp13569ejsn701258d7a016']
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
