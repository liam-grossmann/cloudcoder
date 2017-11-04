import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './desktop.component.html'
})
export class DesktopComponent {

  constructor(private router: Router) {
  }

  navigateToPreviousPortfolioItem() {
    this.router.navigate(['/bondsearch']);
  }

  navigateToPortfolioList() {
    this.router.navigate(['']);
  }

  navigateToNextPortfolioItem() {
    this.router.navigate(['/creditrisk']);
  }
}
