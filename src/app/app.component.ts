import { Component } from '@angular/core';
import { WatchListService } from './portfolio/stockmarketprices/watchList.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
      providers: [WatchListService]
})
export class AppComponent {}
