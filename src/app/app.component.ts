import { Component } from '@angular/core';
import { WatchListService } from './portfolio/stockmarketprices/watchList.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
      providers: [WatchListService]
})
export class AppComponent {
  // title = 'app works!';
}

/*
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}*/

/*
template: `
  <nav>
  <a routerLink="">Home</a>
  <a routerLink="contacts">Contacts</a>
  <a routerLink="stockmarketprices">Stock Market Prices</a>
  </nav>
  <router-outlet></router-outlet>
  `
  */
