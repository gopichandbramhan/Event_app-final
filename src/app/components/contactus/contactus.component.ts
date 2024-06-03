import { Component } from '@angular/core';
import { CommonDataService } from 'src/app/services/common-data.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {

  full_name:string="";
  email:string="";
  mobile_no:string="";
  message:string="";
  constructor(private cms:CommonDataService){}

  sendContactUsdata(){
    const full_name_regex = /^(?![\. ])[a-zA-Z\. ]+(?<! )$/;
    const mobile_no_regex = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
    const emailRegex = /\S+@\S+\.\S+/;
    if(this.full_name == ""){
      alert("please enter Full Name")
      return;
    }else if(full_name_regex.test(this.full_name) == false){
      alert("invalid full name")
      return;
    }
    if(this.mobile_no == ""){
      alert("please enter Mobile No")
      return;
    }else if(mobile_no_regex.test(this.mobile_no) == false){
      alert("invalid mobile no")
      return;
    }
    if(this.email == ""){
      alert("please enter Email")
      return;
    }else if(emailRegex.test(this.email) == false){
      alert("invalid email")
      return;
    }
    if(this.message == ""){
      alert("please enter Message")
      return;
    }

    const formData = new FormData()
    formData.append("full_name",this.full_name)
    formData.append("email",this.email)
    formData.append("mobile_no",this.mobile_no)
    formData.append("message",this.message)
    this.cms.sendContactUsdata(formData).subscribe((data:any)=>{
      alert(data)
      this.full_name = ""
      this.email = ""
      this.mobile_no = ""
      this.message = ""
    })
  }
}
