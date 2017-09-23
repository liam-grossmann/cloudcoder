import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}















(function ($) {
  console.log('Initialise window');
  //$(window).load(function () {
  $('#status').fadeOut();
  $('#preloader').delay(350).fadeOut('slow');
  //});

  $(document).ready(function () {
    /* ---------------------------------------------- /*
* Animated scrolling / Scroll Up
/* ---------------------------------------------- */

    $('a[href*=\\#]').bind('click', function (e) {
      let anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top - 60
      }, 1000);
      e.preventDefault();
    });

    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('.scroll-up').fadeIn();
      } else {
        $('.scroll-up').fadeOut();
      }
    });

// Not sure what this does.    
    /* $(document).on('click', '.navbar-collapse.in', function (e) {
      if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
        $(this).collapse('hide');
      }
     }); */



		/* ---------------------------------------------- /*
		 * Navbar
		/* ---------------------------------------------- */

// Use to hightlight the correct portion of the nav bar as we scroll by    
/*    
    $('body').scrollspy({
      target: '.navbar-custom',
      offset: 70
    });
    */

    let navbar = $('.navbar');
    let navHeight = navbar.height();

    $(window).scroll(function () {
      if ($(this).scrollTop() >= navHeight) {
        navbar.addClass('navbar-color');
      } else {
        navbar.removeClass('navbar-color');
      }
    });

    if ($(window).width() <= 767) {
      navbar.addClass('custom-collapse');
    }

    $(window).resize(function () {
      if ($(this).width() <= 767) {
        navbar.addClass('custom-collapse');
      } else {
        navbar.removeClass('custom-collapse');
      }
    });

		/* ---------------------------------------------- /*
		 * Rotate
		/* ---------------------------------------------- */
    /* Had to cast any any because of type definition issues */
    (<any>$('.rotate')).textrotator({
      animation: 'dissolve',
      separator: '|',
      speed: 3000
    });

  });

})(jQuery);



function main() {

  // jQuery(window).load(function () {
  // $('#status').fadeOut();
  // $('#preloader').delay(350).fadeOut('slow');
  // });

  return platformBrowserDynamic().bootstrapModule(AppModule);
}



if (document.readyState === 'complete') {
  console.log('Boostrapping Angular');
  main();
} else {
  console.log('Boostrapping Angular');
  document.addEventListener('DOMContentLoaded', main);
}

