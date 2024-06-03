import { Component } from '@angular/core';
import { OrganizedEventsService } from 'src/app/services/organized-events.service';
import { RegisterEventService } from 'src/app/services/register-event.service';

@Component({
  selector: 'app-user-event-register',
  templateUrl: './user-event-register.component.html',
  styleUrls: ['./user-event-register.component.css']
})
export class UserEventRegisterComponent {
  
  dtOptions: DataTables.Settings = {};

  registerUserData: any;

    constructor(private oe:RegisterEventService){

    }
    ngOnInit(){
      this.oe.registerEventUser().subscribe((data:any)=>{
        this.registerUserData = data
        // console.log(data)
      })

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true
      };
      
    }
}
