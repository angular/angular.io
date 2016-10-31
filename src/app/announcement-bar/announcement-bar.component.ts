import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'announcement-bar',
  templateUrl: './announcement-bar.component.html'
})
export class AnnouncementBarComponent implements OnInit {
  @ViewChild('innerContent') innerContent: ElementRef;
  
  currentSlide: any;
  slides: any;
  intervalId: any;

  constructor(private elementRef: ElementRef) {
  }
  ngOnInit() {
    this.innerContent.nativeElement.innerHTML = this.elementRef.nativeElement.announcementBarContent;
    this.slides = this.innerContent.nativeElement.getElementsByClassName('announcement-bar-slide');

    // Show first slide
    this.currentSlide = 0;
    this.slides[0].classList.add('is-visible');

    // set an interval
    this.intervalId = setInterval(() => {
      this.currentSlide = this.currentSlide + 1;

      if (this.currentSlide > this.slides.length - 1) {
          this.currentSlide = 0;
      }

      this.changeSlide(null, this.currentSlide)
    }, 5000)
  }

  changeSlide(event, slideNum) {
    // stop interval

    // reset styles
    Array.prototype.forEach.call(this.slides, (s) => {
        s.classList.remove('is-visible')
    });

    // apply styles
    this.slides[slideNum].classList.add('is-visible');
    this.currentSlide = slideNum;
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
