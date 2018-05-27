import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './tournamentwheel.component.html'
})
export class TournamentWheelComponent implements OnInit {

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
    this.router.navigate(['/coinmarkit']);
  }
}




