import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webtask';

  constructor(public authService: AuthenticationService,
    private router:Router){

  }

  logout(){
    this.authService.logout().subscribe(() => {
this.router.navigate(['login'])
    })
  }
}
