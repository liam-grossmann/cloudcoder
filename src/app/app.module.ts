import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { D3Service } from 'd3-ng2-service';
import { appRoutes } from './app.routes';

/* Portfolios */
import { AppComponent } from './app.component';
import { PortfolioListComponent } from './portfolio/portfoliolist/portfoliolist.component';
import { BondSearchComponent } from './portfolio/bondsearch/bondsearch.component';
import { CreditRiskComponent } from './portfolio/creditrisk/creditrisk.component';
import { DesktopComponent } from './portfolio/desktop/desktop.component';
import { StarWarsComponent } from './portfolio/starwars/starwars.component';
import { StockMarketPricesComponent } from './portfolio/stockmarketprices/stockmarketprices.component';
import { TournamentWheelComponent } from './portfolio/tournamentwheel/tournamentwheel.component';

/* Stock Price Child Components */
import { WatchListComponent } from './portfolio/stockmarketprices/watchList.component';
import { TickerDetailsComponent } from './portfolio/stockmarketprices/tickerDetails.component';
import { TickerChartComponent } from './portfolio/stockmarketprices/tickerChart.component';

/* Bond Search Child Component */
import { BondListComponent } from './portfolio/bondsearch/bondList.component';
import { FilterCriteriaBuilderComponent } from './portfolio/bondsearch/filterCriteriaBuilder.component';
import { FilterComponent } from './portfolio/bondsearch/filter.component';
import { BootstrapPaginationComponent } from './portfolio/bondsearch/bootstrappagination.component';

/* Main page components */
import { TechnologiesComponent } from './technologies/technologies.component';

/* Data Services */
import { WatchListService } from './portfolio/stockmarketprices/watchList.service';
import { BondSearchService } from './portfolio/bondsearch/bondsearch.service';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioListComponent,
    BondSearchComponent,
    CreditRiskComponent,
    DesktopComponent,
    StarWarsComponent,
    StockMarketPricesComponent,
    TournamentWheelComponent,
    WatchListComponent,
    TickerDetailsComponent,
    TickerChartComponent,
    BondListComponent,
    FilterCriteriaBuilderComponent,
    FilterComponent,
    BootstrapPaginationComponent,
    TechnologiesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    appRoutes
  ],
  providers: [
    WatchListService,
    BondSearchService,
    D3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
