import { Component } from '@angular/core';
import { OrganizedEventsService } from 'src/app/services/organized-events.service';
import { ResultService } from 'src/app/services/result.service';
import * as $ from 'jquery';
import { CommonDataService } from 'src/app/services/common-data.service';

@Component({
  selector: 'app-auth-result',
  templateUrl: './auth-result.component.html',
  styleUrls: ['./auth-result.component.css']
})
export class AuthResultComponent {

  event_name:string="";
  event_id:string="";
  second_user_id:string="";
  third_user_id:string = "";
  first_prize_arr:any="";
  second_prize_arr:any="";
  third_prize_arr:any="";
  first_user_id:any;
  dtOptions: DataTables.Settings = {};
  
  resultData:any;
  eventData:any;
  
  first_prize:any;
  second_prize:any;
  third_prize:any;
  val:any;

  first_prize_text:string = "";
  second_prize_text:string="";
  third_prize_text:string="";
  id:string="";

  fetchdata:any = "";
  constructor(private result:ResultService,private oe:OrganizedEventsService, private cms:CommonDataService){}
  
  ngOnInit(){
    this.getEventData()
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getData()
  }
  
    submitData(){
      let flag = true;

      if(this.event_name == ""){
        alert("please select name.!")
        flag = false
        return;
      }

      if(this.first_user_id == ""){
        alert("please select first winner.!")
        flag = false
        return;
      }
      if(this.second_user_id ==""){
        alert("please select second winner.!")
        flag = false
        return;
      }
      if(this.third_user_id == ""){
        alert("please select third winner.!")
        flag = false
        return;
      }

      
      if(flag){
        const formData = new FormData();
        formData.append("event_name",this.event_name);
        formData.append("first_prize",this.first_user_id);
        formData.append("second_prize",this.second_user_id);
        formData.append("third_prize",this.third_user_id);
        formData.append("first_prize_text",this.first_prize_text)
        formData.append("second_prize_text",this.second_prize_text)
        formData.append("third_prize_text",this.third_prize_text)
    
        this.result.postResult(formData).subscribe((data:any)=>{
          alert(data)
          this.getData();
        })
      }
    }
  
    getEventData(){
      this.oe.getEventData().subscribe((data:any)=>{
        this.eventData = data
        console.log(data)
      })
    }
  
    getData(){
      this.result.getResult().subscribe((data:any)=>{
          this.resultData = data
      })
    }
  
    deleteResult(event:any){
  
      if(confirm("are sure want to delete this?")){
        alert(event.target.id)
        const id = event.target.id;
        const ids = id.split('-')
        const formData = new FormData()
        formData.append("sr_id",ids[1])
        this.result.deleteResult(formData).subscribe((data:any)=>{
          alert("deleted successfully.!")
          this.getData();
        })
      }
  
    }
  
    getFirstWinner(event:any){
      this.event_name = event.target.value
       const formData = new FormData();
       formData.append("action","firstPrize")
       formData.append("event_name",this.event_name)
       this.cms.getFirstWinner(formData).subscribe((data:any)=>{
        console.log(data)
        this.first_prize_arr = data
        const input = document.getElementById('first_prize') as HTMLSelectElement | null;
        input?.removeAttribute('disabled');
       })
       
    }
  
    getSecondWinner(event:any){debugger
      this.first_user_id = event.target.value
      // alert(event.target.options[event.target.options.selectedIndex].text)
      this.first_prize_text=event.target.options[event.target.options.selectedIndex].text
      const formData = new FormData();
      if((<HTMLSelectElement>document.getElementById('event_name')).value != "" || (<HTMLSelectElement>document.getElementById('event_name')).value === undefined){
        this.event_name = (<HTMLSelectElement>document.getElementById('event_name')).value;
      }
      console.log(this.event_name)
      formData.append("action","secondPrize")
      formData.append("user_id",this.first_user_id)
      formData.append("event_name",this.event_name)
      this.cms.getSecondWinner(formData).subscribe((data:any)=>{
          this.second_prize_arr=data
      })
    }
  
    getThirdWinner(event:any){
      this.second_user_id = event.target.value
      // alert(event.target.options[event.target.options.selectedIndex].text)
      this.second_prize_text=event.target.options[event.target.options.selectedIndex].text
      const formData = new FormData();
      if((<HTMLSelectElement>document.getElementById('event_name')).value != "" || (<HTMLSelectElement>document.getElementById('event_name')).value != ""){
        this.event_name = (<HTMLSelectElement>document.getElementById('event_name')).value;
      }
      // this.event_name = (<HTMLSelectElement>document.getElementById('event_name')).value;
      if((<HTMLSelectElement>document.getElementById('first_prize')).value != "" || (<HTMLSelectElement>document.getElementById('first_prize')).value != ""){
        this.first_prize = (<HTMLSelectElement>document.getElementById('first_prize')).value;
      }
       
      console.log(this.event_name)
    
      formData.append("action","thirdPrize")
      formData.append("first_winner",this.first_user_id)
      formData.append("event_name",this.event_name)
      formData.append("second_winner",this.second_user_id)
      this.cms.getSecondWinner(formData).subscribe((data:any)=>{
          this.third_prize_arr=""
          this.third_prize_arr =data
      })
    }
    ThirdWinner(event:any){debugger
      // if(event.target.value != ""){
        this.third_user_id = event.target.value
        // alert(event.target.options[event.target.options.selectedIndex].text)
        this.third_prize_text=event.target.options[event.target.options.selectedIndex].text
      // }

    }
  
    // editRecord(event:any){
    //   this.edit = true;
    //   const arr = (event.target.id).split("-")
    //   this.val = arr[0]
    //   alert(this.val)
  
    //   const formData = new FormData();
    //    formData.append("action","firstPrize")
    //    formData.append("event_name",event.target.id)
    //    this.cms.getFirstWinner(formData).subscribe((data:any)=>{
    //     console.log(data)
    //     this.first_prize_arr = data
    //     // const input = document.getElementById('first_prize') as HTMLSelectElement | null;
    //     // input?.removeAttribute('disabled');
    //    })
    // }

    getResultById(event:any){
      // alert(event.target.id)
      this.id = event.target.id
      const formData = new FormData()
      formData.append("id",event.target.id)
      this.cms.getResultById(formData).subscribe((data:any)=>{
        this.fetchdata = data
        this.first_user_id = data.first_prize
        this.second_user_id = data.second_prize
        this.third_user_id = data.third_prize
        this.first_prize_text = data.first_prize_text
        this.second_prize_text = data.second_prize_text
        this.third_prize_text = data.third_prize_text
        this.event_name = data.event_name+'-'+data.sr_id
        console.log(data)
        //
        const formData = new FormData();
       formData.append("action","firstPrize")
       formData.append("event_name",this.fetchdata.event_name+'-'+this.fetchdata.event_id)
       this.cms.getFirstWinner(formData).subscribe((data:any)=>{
        console.log(data)
        this.first_prize_arr = data
        this.second_prize_arr = data
        this.third_prize_arr = data

        console.log(this.event_name)
        //

       })
      })
    }

    updateResult(){
      let flag = true;

      if(this.event_name == ""){
        alert("please select name.!")
        flag = false
        return;
      }

      if(this.first_user_id == ""){
        alert("please select first winner.!")
        flag = false
        return;
      }
      if(this.second_user_id ==""){
        alert("please select second winner.!")
        flag = false
        return;
      }
      if(this.third_user_id == ""){
        alert("please select third winner.!")
        flag = false
        return;
      }

      
      if(flag){
        const formData = new FormData();
        formData.append("event_name",this.event_name);
        formData.append("first_prize",this.first_user_id);
        formData.append("second_prize",this.second_user_id);
        formData.append("third_prize",this.third_user_id);
        formData.append("first_prize_text",this.first_prize_text)
        formData.append("second_prize_text",this.second_prize_text)
        formData.append("third_prize_text",this.third_prize_text)
        formData.append("id",this.id)
    
        this.result.updateResult(formData).subscribe((data:any)=>{
          alert(data)
          this.getData();
        })
      }
    }
    
}
