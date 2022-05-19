import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/service/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required)
  })

  constructor(private authService:AuthenticationService,
     private router:Router,
     private toastr:ToastrService
     ) { }

  ngOnInit(): void {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  showSuccess() {
    this.toastr.success('Login Successfully');
  }

  showError() {
    this.toastr.error('Login Failed');
  }

  submit(){
    if(!this.loginForm.valid){
      return
    }
    const {email,password} = this.loginForm.value
    this.authService.login(email, password).subscribe(() => {
      this.showSuccess()
      this.router.navigate(['/home']);
    },(()=>{
      this.showError()
    }))
  }

  signWithGoogle(){
    this.authService.googleSignIn()
  }

  signWithFacebook(){
    this.authService.facebookSignIn()
  }


}
