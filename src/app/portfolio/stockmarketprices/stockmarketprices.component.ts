import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';

@Component({
  templateUrl: './stockmarketprices.component.html'
})
export class StockMarketPricesComponent {

  constructor(private router: Router) {
  }

  navigateToPreviousPortfolioItem() {
    this.router.navigate(['/desktop']);
  }

  navigateToPortfolioList() {
    this.router.navigate(['']);
  }

  navigateToNextPortfolioItem() {
    this.router.navigate(['/starwars']);
  }
}
