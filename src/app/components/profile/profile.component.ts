import { Component } from '@angular/core';
import { sha256 } from 'js-sha256';
import { AuthService } from 'src/app/services/auth.service';
import { CommonDataService } from 'src/app/services/common-data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  email:any;
  user_type:any;
  profileData:any
  currentpass:string="";
  newpass:string="";
  confirmpass:string="";
  flag:boolean = true;
  name:any;
  mobile_no:any;
  constructor(private cms:CommonDataService,private auth:AuthService){}

  ngOnInit(){
    this.user_type = sessionStorage.getItem("user_type");
    // this.email = sessionStorage.getItem("email");
    // this.name = sessionStorage.getItem("full_name")
    // this.mobile_no = sessionStorage.getItem("mobile_no")
    this.getProfileData()
    Swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success"
    });
  }

  getProfileData(){
     this.email = sessionStorage.getItem("email")
    const formdata = new FormData()
    formdata.append("email",this.email)
    this.cms.getProfileData(formdata).subscribe((data:any)=>{
      this.profileData = data
      console.log(data)
      this.name = this.profileData.full_name
      this.email = this.profileData.email
      this.mobile_no = this.profileData.mob_no
    })
  }

  changepass(){
    if(this.newpass ==""){
      this.flag =  false
      alert("enter new password")
    }
     if(this.currentpass ==""){
      this.flag =  false
      alert("enter current password")
    } 
     if(this.confirmpass ==""){
      this.flag =  false
      alert("enter confirm password")
    }

    if(this.newpass == this.confirmpass){
      this.flag = true
    }else{
      this.flag = false
      alert("new password and confirm password not matched!")
    }

    if(this.flag){
      alert("ok")
      const formData = new FormData();
      formData.append("newpassword",sha256(this.newpass));
      formData.append("confirmpassword",sha256(this.confirmpass));
      formData.append("currentpassword",sha256(this.currentpass));
      formData.append("action","changepass");
      formData.append("user_id",this.email);

      this.auth.changepass(formData).subscribe((data:any)=>{
        alert(data);
      })
    }
  }

  updateProfile(){
    const formdata = new FormData()
    formdata.append("name",this.name)
    formdata.append("mobile_no",this.mobile_no)
    formdata.append("email",this.email)
    this.auth.updateProfile(formdata).subscribe((data:any)=>{
      alert(data)
      this.getProfileData()
    })
  }
}
