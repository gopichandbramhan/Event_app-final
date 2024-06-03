import { Component } from '@angular/core';
import { OrganizedEventsService } from 'src/app/services/organized-events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  eventData:any="";
  today:string="2024-11-01";
  constructor(private eventDetails:OrganizedEventsService){
  }

  ngOnInit(){
      this.eventDetails.getEventData().subscribe((data:any)=>{
          console.log(data)
          this.eventData = data
          // this.today = new Date();
      })
  }
}
