import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './tournamentwheel.component.html'
})
export class TournamentWheelComponent {

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.doCanvasApp();
  }

  doCanvasApp() {
    (<any>window).canvasApp();
  }

  navigateToPreviousPortfolioItem() {
    this.router.navigate(['/starwars']);
  }

  navigateToPortfolioList() {
    this.router.navigate(['']);
  }

  navigateToNextPortfolioItem() {
    this.router.navigate(['/bondsearch']);
  }
}




