import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';
import { AuthService } from 'src/app/services/auth.service';
import { CommonDataService } from 'src/app/services/common-data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  full_name:string="";
  email:string="";
  mob_no:string="";
  password:string="";
  confirm_password:string=""
  terms:boolean=false;
  file:any ="";
  checkMobFlag:boolean = true
  checkEmailFlag:boolean = true
  constructor(private auth:AuthService, private cms:CommonDataService, private router:Router){}

  captcha:string="";
  printCaptcha:string="";

  ngOnInit(){
    this.generate();
  }

  generate(){
    this.auth.captcha().subscribe((data:any)=>{
      console.log(data)
      this.printCaptcha = data;
    })
  }

  doAction(event:any){
    this.terms = event.target.checked;
  }

  fileUpload(event:any){
    this.file=event.target.files[0];
    console.log(event.target.files[0])
  }

  checkMobile(){
    const formData = new FormData();
      formData.append("mob_no",this.mob_no);
      formData.append("action","checkMobile");
      this.cms.checkMobile(formData).subscribe((data:any)=>{
          console.log(data)
          if(data == "found"){
            (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
            (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "mobile no already exist!";
            this.checkMobFlag = false
            // return;
          }else{
            (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'none';
            this.checkMobFlag = true
          }
      })
  }

  checkEmail(){
    const formData = new FormData();
    formData.append("email",this.email);
    formData.append("action","checkEmail");
    this.cms.checkEmail(formData).subscribe((data:any)=>{
      if(data == "found"){
        (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
        (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "email already exist!";
        this.checkEmailFlag = false
      }else{
        (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'none';
        this.checkEmailFlag = true
      }
    })
  }

  registerUser(){debugger
    let flag = true;

    const full_name_regex = /^(?![\. ])[a-zA-Z\. ]+(?<! )$/;
    (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'none';
    (<HTMLElement>document.querySelector(".success-msg")).style.display = 'none';

    if(this.full_name == ''){
      // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
      // (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "please enter full name";
      Swal.fire({
        icon: "error",
        title: "please enter full name",
        text: "Something went wrong!"
      });
      flag = false
      return;
    }else if(full_name_regex.test(this.full_name) != true){
      // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
      // (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "please enter valid full name";
      Swal.fire({
        icon: "error",
        title: "please enter valid full name",
        text: "Something went wrong!"
      });
      flag = false
      return;
    }

    const mobile_no = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;

    if(this.mob_no == ''){
      // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
      // (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "please enter mobile no";
      Swal.fire({
        icon: "error",
        title: "please enter mobile no",
        text: "Something went wrong!"
      });
      flag = false
      return;
    }else if(mobile_no.test(this.mob_no) != true){
      // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
      // (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "please enter valid mobile no";
      Swal.fire({
        icon: "error",
        title: "please enter valid mobile no",
        text: "Something went wrong!"
      });
      flag = false
      return;
    }

    var emailRegex = /\S+@\S+\.\S+/;
    if(this.email == ''){
      // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
      // (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "please enter email";
      Swal.fire({
        icon: "error",
        title: "please enter email",
        text: "Something went wrong!"
      });
      flag = false
      return;
    }
    else if(emailRegex.test(this.email) !=true){
      // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
      // (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "please enter valid email";
      Swal.fire({
        icon: "error",
        title: "please enter valid email",
        text: "Something went wrong!"
      });
      flag = false
      return;
    }

    if(this.password == ''){
      // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
      // (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "please enter password";
      Swal.fire({
        icon: "error",
        title: "please enter password",
        text: "Something went wrong!"
      });
      flag = false
      return;
    } 

    if(this.confirm_password == ''){
      // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
      // (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "please enter confirm password";
      Swal.fire({
        icon: "error",
        title: "please enter confirm password",
        text: "Something went wrong!"
      });
      flag = false
      return;
    }

    if(this.password != this.confirm_password){
      // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
      // (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "Both password is not matched";
      Swal.fire({
        icon: "error",
        title: "Both password is not matched",
        text: "Something went wrong!"
      });
      flag = false
      return;
    }

    if(this.file === undefined || this.file == ''){
      // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
      // (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "please upload profile photo";
      Swal.fire({
        icon: "error",
        title: "please upload profile photo",
        text: "Something went wrong!"
      });
      flag = false
      return;
    }

    var cap = /^[a-zA-Z0-9]{6,}$/;
    if(this.captcha == ""){
      Swal.fire({
        icon: "error",
        title: "please enter captcha",
        text: "Something went wrong!"
      });
      flag = false
      return;
    }

    if(cap.test(this.captcha) !=true){
      // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
      // (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "please enter valid captcha";
      Swal.fire({
        icon: "error",
        title: "please enter valid captcha",
        text: "Something went wrong!"
      });
      flag = false
      return;
    }
    if(this.terms == false){
      // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
      // (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "please checked checkbox.!";
      Swal.fire({
        icon: "error",
        title: "please checked checkbox.!",
        text: "Something went wrong!"
      });
      flag = false
      return;
    }
    
    if(flag){
      const formData = new FormData();
      formData.append("action", "registerUser");
      formData.append("user_type", "User");
      formData.append("full_name",this.full_name);
      formData.append("email",this.email);
      formData.append("password",sha256(this.password));
      formData.append("mob_no",this.mob_no);
      formData.append("profile_photo", this.file);
      formData.append("captcha",this.captcha)
      // this.auth.registerUser({action:"registerUser",user_type:"User",full_name:this.full_name,email:this.email,mob_no:this.mob_no,password:sha256(this.password)}).subscribe((data:any)=>{
        // console.log(data)
        this.auth.registerUser(formData).subscribe((data:any)=>{
        if(data == "User Registered successfully.!"){
          // (<HTMLElement>document.querySelector(".success-msg")).style.display = 'block';
          // (<HTMLElement>document.querySelector(".danger-msg")).style.display = 'none';
          // (<HTMLElement>document.querySelector(".success-msg")).innerHTML = "User Registered successfully.!";
          Swal.fire({
            title: "Success!",
            text: "User Registered successfully.!",
            icon: "success"
          });
          // alert("User Registered successfully.!")
          this.router.navigate(['/login']);
        }else{
          // (<HTMLElement>document.querySelector(".success-msg")).style.display = 'none';
          // (<HTMLElement>document.querySelector(".danger-msg")).style.display = 'block';
          // (<HTMLElement>document.querySelector(".danger-msg")).innerHTML = data;
          Swal.fire({
            icon: "error",
            title: data,
            text: "Something went wrong!"
          });
        }
      })
    }

  }

}
