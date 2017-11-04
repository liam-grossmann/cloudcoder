import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './creditrisk.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./creditrisk.component.css']
})
export class CreditRiskComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.doD3MapApp();
  }

  doD3MapApp() {
    (<any>window).d3MapApp();
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
