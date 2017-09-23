import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortfolioListComponent } from './portfolio/portfoliolist/portfoliolist.component';
import { BondSearchComponent } from './portfolio/bondsearch/bondsearch.component';
import { DesktopComponent } from './portfolio/desktop/desktop.component';
import { StarWarsComponent } from './portfolio/starwars/starwars.component';
import { StockMarketPricesComponent } from './portfolio/stockmarketprices/stockmarketprices.component';
import { TournamentWheelComponent } from './portfolio/tournamentwheel/tournamentwheel.component';

const routes: Routes = [
    {
        path: '',
        component: PortfolioListComponent
    },
    {
        path: 'bondsearch',
        component: BondSearchComponent
    },
    {
        path: 'desktop',
        component: DesktopComponent
    },
    {
        path: 'starwars',
        component: StarWarsComponent
    },
    {
        path: 'stockmarketprices',
        component: StockMarketPricesComponent
    },
    {
        path: 'tournamentwheel',
        component: TournamentWheelComponent
    }
];

export const appRoutes = RouterModule.forRoot(routes);
