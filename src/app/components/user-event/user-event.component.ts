import { Component } from '@angular/core';
import { OrganizedEventsService } from 'src/app/services/organized-events.service';

@Component({
  selector: 'app-user-event',
  templateUrl: './user-event.component.html',
  styleUrls: ['./user-event.component.css']
})
export class UserEventComponent {
  eventData:any="";
  
  constructor(private eventDetails:OrganizedEventsService){
  }

  ngOnInit(){
      this.eventDetails.getEventData().subscribe((data:any)=>{
          console.log(data)
          this.eventData = data
      })
  }
}
