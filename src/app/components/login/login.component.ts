import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';
import { AuthService } from 'src/app/services/auth.service';
import { CommonDataService } from 'src/app/services/common-data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService:AuthService, private router:Router){}
  user_id:string="";
  password:string="";
  action:string="signin";
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

  login(){debugger
    let flag = true;

    if(this.user_id ==""){
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
    if(this.password ==""){
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
    if(this.password =="" && this.user_id ==""){
      // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
      // (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "please enter user name and password";
      Swal.fire({
        icon: "error",
        title: "please enter user name and password",
        text: "Something went wrong!"
      });
      flag = false
      return;
    }
    var re = /\S+@\S+\.\S+/;
    if(re.test(this.user_id) !=true){
      // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
      // (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = "please enter valid user name";
      Swal.fire({
        icon: "error",
        title: "please enter valid user name",
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
      this.authService.loginService({user_id:this.user_id,password:this.password,action:this.action, captcha:this.captcha}).subscribe((data:any)=>{
          // console.log(data)
          // if(data == "login successfully.!"){
          //     (<HTMLElement>document.querySelector(".alert-success")).style.display = 'block';
          //     (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'none';
          //     (<HTMLElement>document.querySelector(".alert-success")).innerHTML = "login successfully.!";
          //     localStorage.setItem("token","loggedIn");
          //     this.router.navigate(['/auth/dashboard']);
              
          // }else 
          if(data == "invalid user id or password.!" || data == "please enter user_id" || data == "please enter password" || data == "please enter captcha" || data == "captcha does not match"){
              // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'block';
              // (<HTMLElement>document.querySelector(".alert-danger")).innerHTML = data;
              // (<HTMLElement>document.querySelector(".alert-success")).style.display = 'none';
              Swal.fire({
                icon: "error",
                title: data,
                text: "Something went wrong!"
              });
              localStorage.clear()
          }else{
            // (<HTMLElement>document.querySelector(".alert-success")).style.display = 'block';
            // (<HTMLElement>document.querySelector(".alert-danger")).style.display = 'none';
            // (<HTMLElement>document.querySelector(".alert-success")).innerHTML = "login successfully.!";
            
            sessionStorage.setItem("token","loggedIn");
            sessionStorage.setItem("email", data.email);
            sessionStorage.setItem("user_type", data.user_type);
            sessionStorage.setItem("full_name",data.full_name)
            sessionStorage.setItem("mobile_no",data.mob_no)
            Swal.fire({
              title: "Success!",
              text: "login sucessfully!",
              icon: "success"
            });
            if(data.user_type == "Admin"){
              this.router.navigate(['/auth/dashboard']);
            }else if(data.user_type == "User"){
              this.router.navigate(['/user/user-dashboard']);
            }
          }        
      })
    }
}
}
