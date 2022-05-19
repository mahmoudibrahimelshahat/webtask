import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';


const redirectToHome  = () => redirectLoggedInTo(['home'])
const redirectToLogin   = () => redirectUnauthorizedTo(['login'])


const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    component: LoginComponent,
  },
 {
  path: 'login',
  component: LoginComponent,
  ...canActivate(redirectToHome)
 },
 {
  path: 'sign-up',
  component: SignUpComponent,
  ...canActivate(redirectToHome)

 },
 {
  path: 'home',
  component: HomeComponent,
  ...canActivate(redirectToLogin)
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
