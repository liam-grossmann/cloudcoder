import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './creditrisk.component.html',
  styleUrls: ['./creditrisk.component.css']
})
export class CreditRiskComponent {

  constructor(private router: Router) {
  }

  navigateToPreviousPortfolioItem() {
    this.router.navigate(['/desktop']);
  }

  navigateToPortfolioList() {
    this.router.navigate(['']);
  }

  navigateToNextPortfolioItem() {
    this.router.navigate(['/stockmarketprices']);
  }
}
