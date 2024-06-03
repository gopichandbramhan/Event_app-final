import { Expansion } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';
import { AuthService } from 'src/app/services/auth.service';
import { CommonDataService } from 'src/app/services/common-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})

export class ForgotpassComponent {
  user_id:string="";
  password:string="";
  confirm_password:string="";
  flag:boolean=false;
  
  checkFlag:boolean = true
  
  constructor(private cms:CommonDataService, private router:Router,private authService:AuthService){}

  captcha:string="";
  printCaptcha:string="";

  ngOnInit(){
    this.generate();
  }

  generate(){
    this.authService.captcha().subscribe((data:any)=>{
      console.log(data)
      this.printCaptcha = data;
    })
  }

    checkUser(){
      let flag = true;
      // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'none';
      if(this.user_id ==""){
        // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
        // (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "please enter email";
        Swal.fire({
          icon: "error",
          title: "please enter email.!",
          text: "Something went wrong!"
        });
        flag = false
        return;
      }
      // if(this.password ==""){
      //   (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
      //   (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "please enter password";
      //   flag = false
      // }
      // if(this.password =="" && this.user_id ==""){
      //   (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
      //   (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "please enter user name and password";
      //   flag = false
      // }
      var re = /\S+@\S+\.\S+/;
      if(re.test(this.user_id) !=true){
        // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
        // (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "please enter valid user name";
        Swal.fire({
          icon: "error",
          title: "please enter valid user name!",
          text: "Something went wrong!"
        });
        flag = false
        return;
      }

      var cap = /^[a-zA-Z0-9]{6,}$/;
      if(this.captcha ==""){
        // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
        // (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "please enter captcha";
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

      if(flag){
        const formData = new FormData()
        formData.append("action","forgotpass")
        formData.append("email",this.user_id)
        formData.append("captcha",this.captcha)

        this.cms.checkUser(formData).subscribe((data:any)=>{
          console.log(data)
            if(data == 'user found.!'){
              this.captcha = "";
              this.generate();
              this.flag = true
            }else{
              Swal.fire({
                icon: "error",
                title: "User does not exist.!",
                text: "Something went wrong!"
              });
              this.flag = false
            }
        })
      }
    }
  
    submitPass(){
      let flag = true;

      // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'none';
      if(this.user_id ==""){
        // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
        // (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "please enter email";
        Swal.fire({
          icon: "error",
          title: "please enter email.!",
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
            title: "please enter password.!",
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
            title: "please enter confirm password.!",
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
            title: "Both password is not matched.!",
            text: "Something went wrong!"
          });
          flag = false
          return;
        }

        var cap = /^[a-zA-Z0-9]{6,}$/;
        if(this.captcha ==""){
          // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
          // (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "please enter captcha";
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
  
        if(flag){
          this.password =sha256(this.password)
          this.confirm_password =sha256(this.confirm_password)
          const formData = new FormData()
          formData.append("action","forgotpass")
          formData.append("email",this.user_id)
          formData.append("password",this.password)
          formData.append("captcha",this.captcha)
          this.cms.forgotpass(formData).subscribe((data:any)=>{
            console.log(data)
            if(data == 'password Inserted successfully.!'){
              Swal.fire({
                title: "Success!",
                text: data,
                icon: "success"
              });
              this.router.navigate(['/login'])
            }else{
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
