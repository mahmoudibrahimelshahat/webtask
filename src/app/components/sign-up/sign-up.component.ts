import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm = new FormGroup({
    username: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required)
  })

  constructor(private authService:AuthenticationService,
    private router:Router,
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  showSuccess() {
    this.toastr.success('Signup Successfully');
  }

  showError() {
    this.toastr.error('Email Already Exist');
  }

  submitForm(){
    if(!this.signUpForm.valid){
      return
    }
    const {username,email,password} = this.signUpForm.value
    this.authService.signUp(username,email, password).subscribe(() => {
      this.router.navigate(['home'])
      this.showSuccess()
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

