import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './bondsearch.component.html'
})
export class BondSearchComponent {

  constructor(private router: Router) {
  }

 navigateToPreviousPortfolioItem() {
    this.router.navigate(['/coinmarkit']);
  }

  navigateToPortfolioList() {
    this.router.navigate(['']);
  }

  navigateToNextPortfolioItem() {
    this.router.navigate(['/desktop']);
  }
}

