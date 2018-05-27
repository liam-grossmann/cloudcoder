import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortfolioListComponent } from './portfolio/portfoliolist/portfoliolist.component';
import { BondSearchComponent } from './portfolio/bondsearch/bondsearch.component';
import { CreditRiskComponent } from './portfolio/creditrisk/creditrisk.component';
import { DesktopComponent } from './portfolio/desktop/desktop.component';
import { StarWarsComponent } from './portfolio/starwars/starwars.component';
import { StockMarketPricesComponent } from './portfolio/stockmarketprices/stockmarketprices.component';
import { TournamentWheelComponent } from './portfolio/tournamentwheel/tournamentwheel.component';
import { CoinMarkitComponent } from './portfolio/coinmarkit/coinmarkit.component';

const routes: Routes = [
    {
        path: '',
        component: PortfolioListComponent
    }, {
        path: 'bondsearch',
        component: BondSearchComponent
    }, {
        path: 'creditrisk',
        component: CreditRiskComponent
    }, {
        path: 'desktop',
        component: DesktopComponent
    }, {
        path: 'starwars',
        component: StarWarsComponent
    }, {
        path: 'stockmarketprices',
        component: StockMarketPricesComponent
    }, {
        path: 'tournamentwheel',
        component: TournamentWheelComponent
    }, {
        path: 'coinmarkit',
        component: CoinMarkitComponent
    }
];

export const appRoutes = RouterModule.forRoot(routes);
