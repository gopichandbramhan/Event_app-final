import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizedEventsService } from 'src/app/services/organized-events.service';
import { RegisterEventService } from 'src/app/services/register-event.service';
declare var Razorpay:any;
@Component({
  selector: 'app-view-event-details',
  templateUrl: './view-event-details.component.html',
  styleUrls: ['./view-event-details.component.css']
})
export class ViewEventDetailsComponent {
  email:any="";
  event_name:string="";
  event_id:string="";
  event_data:any="";
    flag:boolean | undefined;
    file:any;
    fileFlag:boolean=true;
    constructor(private route:ActivatedRoute, private oe:OrganizedEventsService,private router:Router,private re:RegisterEventService){}
    
    fileUpload(event:any){
      this.file=event.target.files[0];
      console.log(event.target.files[0])
    }

    ngOnInit(){

      this.event_name=this.route.snapshot.params['event-name']
      this.event_id=this.route.snapshot.params['id']
      this.email = sessionStorage.getItem("email")

      this.getEventData()
    }

    getEventData(){
      const formData = new FormData();
      formData.append("event_name",this.event_name)
      formData.append("event_id",this.event_id)
      this.oe.getEventDataById(formData).subscribe((data:any)=>{
          this.event_data = data;
          const today = new Date();
          const date2 = new Date(data.register_end_date);
           if(today > date2){
              this.flag = false
           }else{
              this.flag = true
           }
      })
    }

    doAction(){
      sessionStorage.setItem("event_name",this.event_name);
      sessionStorage.setItem("event_id",this.event_id);
      this.router.navigate(['/user/payment']);
    }

    paynow() {
      console.log(this.file)
      if(this.file === undefined){
        alert("please select file")
        this.fileFlag = false;
      }else{
        this.fileFlag = true
      }

      if(this.fileFlag){
        if(sessionStorage.getItem("user_type")){
          const RazorpayOptions = {
            description : 'sample RazorPay demo',
            currency:'INR',
            amount: this.event_data.registration_fees+"00",
            name:sessionStorage.getItem("full_name"),
            key:'rzp_test_QxSenUPTLcKeFz',
            image:'',
            prefills:{
              name:sessionStorage.getItem("full_name"),
              email:sessionStorage.getItem("email"),
              phone:sessionStorage.getItem("mob_no")
            },
            // ... your existing options
            "handler": (response: any) => { 
              // alert(response.razorpay_payment_id);
              // alert(response.razorpay_order_id);
              // alert(response.razorpay_signature);
              
              const formData = new FormData();
              formData.append("payment_id", response.razorpay_payment_id);
              formData.append("event_name", this.event_name); 
              formData.append("event_id", this.event_id);
              formData.append("email",this.email);
              formData.append("file",this.file);
      
              this.re.registerEvent(formData).subscribe((data: any) => {
                alert(data);

              });
            },
            theme:{
              color:'#6466e3'
            },
            modal:{
              ondismiss:()=>{
                console.log('dismissed')
              }
            }
          }
      
          const successCallback = (data:any)=>{
            console.log(data.razorpay_payment_id)
          }
      
          const failureCallback= (e:any)=>{
            console.log(e)
          }
      
          Razorpay.open(RazorpayOptions,successCallback,failureCallback)
        }else{
          alert("please login first...!")
        }
      }

    }
  }

