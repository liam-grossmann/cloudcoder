import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';

@Component({
  templateUrl: './starwars.component.html',
  styleUrls: ['./starwars.component.css']
})
export class StarWarsComponent implements OnInit {

  @ViewChild('introductionText') private introductionText: ElementRef;
  @ViewChild('logo') private logo: ElementRef;
  @ViewChild('titlecontent') private titlecontent: ElementRef;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.doAnimations();
  }

  doAnimations() {
    let introductionTextDisappears = 2000;
    let logoTextAppears = introductionTextDisappears + 250;
    let logoTextFadeOut = logoTextAppears + 500;
    let logoTextFadeOutDuration = 2500;
    let scrollDuration = 100;
    let oneMinute = 50000;

    let introductionTextElement = this.introductionText.nativeElement;
    let logoElement = this.logo.nativeElement;
    let titlecontentElement = this.titlecontent.nativeElement;

    // Apply class so that the scrolling text will scroll. Change color so it is visible.
    // TODO: Remove jQuery reference!!
    $('#titlecontent').addClass('scrollingText');
    $('#titlecontent').css('color', '#ff6');

    // Intro text will disappear
    d3.select(introductionTextElement).transition().delay(introductionTextDisappears).style("opacity", "0");

    // Image will get smaller and disappear.
    d3.select(logoElement).transition().delay(logoTextAppears).style("opacity", "1");
    d3.select(logoElement).transition().delay(logoTextFadeOut).duration(logoTextFadeOutDuration).style("font-size", "5px").style("opacity", "0");
  };

  navigateToPreviousPortfolioItem() {
    this.router.navigate(['/stockmarketprices']);
  }

  navigateToPortfolioList() {
    this.router.navigate(['']);
  }

  navigateToNextPortfolioItem() {
    this.router.navigate(['/tournamentwheel']);
  }
}
