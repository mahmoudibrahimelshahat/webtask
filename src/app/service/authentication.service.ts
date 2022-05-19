import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, updateProfile ,  signInWithPopup, FacebookAuthProvider  } from 'firebase/auth';
import { from, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    currentUser$ = authState(this.auth)
  AngularFireAuth: any;
  constructor(private auth:Auth
    ,private router:Router,
    private toastr:ToastrService,
    private fireauth : AngularFireAuth) { }

  login(username:string , password:string){
   return from(signInWithEmailAndPassword(this.auth, username, password)) 
  }

  signUp(username:string, email:string, password:string){
   return from(createUserWithEmailAndPassword(this.auth, email ,password)).pipe(
     switchMap(({ user }) => updateProfile(user, {  displayName: username }))
   ) 
  }

  logout(){
   return from(this.auth.signOut());
  }


  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(() => {
      this.router.navigate(['/home']);
      this.toastr.success('Sign In Successfully');
    }, () => {
    this.toastr.error('Sign In Failed');
    })
  }


  facebookSignIn() {
    return this.fireauth.signInWithPopup(new FacebookAuthProvider).then(() => {
      this.router.navigate(['/home']);
      this.toastr.success('Sign In Successfully');
    }, () => {
    this.toastr.error('Sign In Failed');
    })
  }





}
