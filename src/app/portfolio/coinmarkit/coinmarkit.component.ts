import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './coinmarkit.component.html'
})
export class CoinMarkitComponent {

  constructor(private router: Router) {
  }

  navigateToPreviousPortfolioItem() {
    this.router.navigate(['/tournamentwheel']);
  }

  navigateToPortfolioList() {
    this.router.navigate(['']);
  }

  navigateToNextPortfolioItem() {
    this.router.navigate(['/bondsearch']);
  }
}
