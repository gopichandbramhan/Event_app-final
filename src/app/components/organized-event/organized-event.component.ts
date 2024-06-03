import { AfterViewInit, Component } from '@angular/core';
import { OrganizedEventsService } from 'src/app/services/organized-events.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
// import 'jquery-datetimepicker';
@Component({
  selector: 'app-organized-event',
  templateUrl: './organized-event.component.html',
  styleUrls: ['./organized-event.component.css']
})
export class OrganizedEventComponent implements AfterViewInit{

  
  dtOptions: DataTables.Settings = {};

  eventData:any="";

  constructor(private oe:OrganizedEventsService, private router:Router){

  }

  
  ngOnInit(){
    this.getData()
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
  }

  getData(){
    this.oe.getAllEventData().subscribe((data:any)=>{
      this.eventData = data
      console.log(data)
    })
  }

  ngAfterViewInit(){
    // $("mat-label").html("hello")
      // $(".datetimepicker").each(function () {
      //   $(this).datetimepicker();
      // });
  }
  id:any;
  viewdata:any;
  event_name: string = "";
  registerFees:string="";
  registerStartDate:string="";
  registerEndDate:string="";
  eventStartDate:string="";
  eventEndDate:string="";
  eventDetails:string="";
  first_prize:string="";
  second_prize:string="";
  third_prize:string="";
  file:any = "";
  first_prize_image:string="";
  second_prize_image:string="";
  third_prize_image:string="";
  event_type:any;
  fileUpload(event:any){
    this.file=event.target.files[0];
    console.log(event.target.files[0])
  }

  fileUpload1(event:any){
    this.first_prize_image=event.target.files[0];
    console.log(event.target.files[0])
  }

  fileUpload2(event:any){
    this.second_prize_image=event.target.files[0];
    console.log(event.target.files[0])
  }

  fileUpload3(event:any){
    this.third_prize_image=event.target.files[0];
    console.log(event.target.files[0])
  }

  get_event_type(event:any){
    this.event_type = event.target.value
  }

  postOrganizedEvent(){
    if(this.event_name == ""){
      alert("please enter event name")
      return;
    }
    if(this.registerFees == ""){
      alert("please enter register Fees")
      return;
    }   
    if(this.registerStartDate == ""){
      alert("please enter registration Start Date")
      return;
    }
    if(this.registerEndDate == ""){
      alert("please enter registration Start Date")
      return;
    }
    if(this.eventStartDate == ""){
      alert("please enter event Start Date")
      return;
    }
    if(this.eventEndDate == ""){
      alert("please enter event end Date")
      return;
    }

    if(this.first_prize == ""){
      alert("please enter first prize")
      return;
    }
    if(this.first_prize_image === undefined){
      alert("please select first prize image")
      return;
    }
    if(this.second_prize == ""){
      alert("please enter second_prize")
      return;
    }
    if(this.second_prize_image === undefined){
      alert("please select second prize image")
      return;
    }
    if(this.third_prize == ""){
      alert("please enter third_prize")
      return;
    }
    if(this.third_prize_image === undefined){
      alert("please select third prize image")
      return;
    }
    if(this.file === undefined){
      alert("please select event banner images")
      return;
    }
    if(this.eventDetails == ""){
      alert("please enter event eventDetails")
      return;
    }
    if(this.event_type == ""){
      alert("please select event type")
      return;
    }
    
    const formData = new FormData();
      formData.append("action", "registerUser");
      formData.append("event_name", this.event_name);
      formData.append("registerFees",this.registerFees);
      formData.append("registerStartDate",this.registerStartDate);
      formData.append("registerEndDate",this.registerEndDate);
      formData.append("eventStartDate",this.eventStartDate);
      formData.append("eventEndDate",this.eventEndDate);
      formData.append("eventDetails",this.eventDetails);
      formData.append("first_prize",this.first_prize);
      formData.append("second_prize",this.second_prize);
      formData.append("third_prize",this.third_prize);
      formData.append("event_images", this.file);
      formData.append("first_prize_image", this.first_prize_image);
      formData.append("second_prize_image", this.second_prize_image);
      formData.append("third_prize_image", this.third_prize_image);
      formData.append("event_type", this.event_type);

    // this.oe.postEventData({event_name:this.event_name,registerFees:this.registerFees,registerStartDate:this.registerStartDate,
    //   registerEndDate:this.registerEndDate,eventStartDate:this.eventStartDate,eventEndDate:this.eventEndDate,eventDetails:this.eventDetails,action:"insertEventsOrganized"}).subscribe((data:any)=>{
      this.oe.postEventData(formData).subscribe((data:any)=>{
      alert(data);
      this.clearform()
      this.getData()
      location.reload();
    })
  }
  clearform(){
    this.event_name = ""
    this.registerFees = ""
    this.registerStartDate = ""
    this.registerEndDate = ""
    this.eventStartDate = ""
    this.eventEndDate = ""
    this.eventDetails = ""
    this.first_prize = ""
    this.second_prize = ""
    this.third_prize = ""
    this.first_prize_image = ""
    this.second_prize_image = ""
    this.third_prize_image = ""
    this.event_type = ""
    this.file = ""
  }
  delete(event:any){
    alert(event.target.id)
    const formData = new FormData();
    formData.append("sr_id",event.target.id)

    if(confirm("are you sure want delete this event ?")){
      this.oe.deleteEventData(formData).subscribe((data:any)=>{
        alert("deleted successfully.!")
        this.getData()
      })
    }
  }

  view(sr_id:any){
    const formData = new FormData();
    formData.append("sr_id",sr_id)
    this.oe.getEventById(formData).subscribe((data:any)=>{
      this.viewdata=data
      console.log(data)
    })
  }

  edit(sr_id:any){
    const formData = new FormData();
    formData.append("sr_id",sr_id)
    this.oe.getEventById(formData).subscribe((data:any)=>{
      this.viewdata=data
      this.id = data.sr_id
      this.event_name = data.event_name
      this.registerFees = data.registration_fees
      this.registerStartDate = data.register_start_date
      this.registerEndDate = data.register_end_date
      this.eventStartDate = data.event_start_date
      this.eventEndDate = data.event_end_date
      this.eventDetails = data.event_details
      this.first_prize = data.first_prize
      this.second_prize = data.second_prize
      this.third_prize = data.third_prize
      // this.first_prize_image = data.first_prize_image
      // this.second_prize_image = data.second_prize_image
      // this.third_prize_image = data.third_prize_image
      this.event_type = data.event_type
      // this.file = data.event_image
      console.log(data)
    })
  }

  updateEvent(){
    const formData = new FormData();
      formData.append("id",this.id)
      formData.append("action", "registerUser");
      formData.append("event_name", this.event_name);
      formData.append("registerFees",this.registerFees);
      formData.append("registerStartDate",this.registerStartDate);
      formData.append("registerEndDate",this.registerEndDate);
      formData.append("eventStartDate",this.eventStartDate);
      formData.append("eventEndDate",this.eventEndDate);
      formData.append("eventDetails",this.eventDetails);
      formData.append("first_prize",this.first_prize);
      formData.append("second_prize",this.second_prize);
      formData.append("third_prize",this.third_prize);
      formData.append("event_images", this.file);
      formData.append("first_prize_image", this.first_prize_image);
      formData.append("second_prize_image", this.second_prize_image);
      formData.append("third_prize_image", this.third_prize_image);
      formData.append("event_type", this.event_type);

      this.oe.updateEventData(formData).subscribe((data:any)=>{
        alert(data)
        location.reload();
      })
  }
}
