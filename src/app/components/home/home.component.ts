import { Component } from '@angular/core';
import { BannerImagesService } from 'src/app/services/banner-images.service';
import { OrganizedEventsService } from 'src/app/services/organized-events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  eventData:any="";
  today:string="2024-11-01";
  constructor(private eventDetails:OrganizedEventsService, private photoService: BannerImagesService){
  }

  ngOnInit(){
      this.eventDetails.getEventData().subscribe((data:any)=>{
          console.log(data)
          this.eventData = data
      })
      this.photoService.getPhotos().subscribe((data: any) => {
        this.photos = data.photos.slice(3, 8);
        this.startSlideShow();
      });
  }


  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }
  
  photos: any[] = [];
  currentSlide = 0;
  slideInterval: any;

  startSlideShow(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000); // Change slide every 3 seconds
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide > 0) ? this.currentSlide - 1 : this.photos.length - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide < this.photos.length - 1) ? this.currentSlide + 1 : 0;
  }
}
