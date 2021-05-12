import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from '../shared/auth-state.service';
import { AuthService } from '../shared/auth.service';
import { TokenService } from '../shared/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'DABS-Application';

  isSignedIn: boolean = false;

  constructor(
    private auth: AuthStateService, private authService: AuthService,
    public router: Router,
    public token: TokenService,
  ) {
  }

  ngOnInit() {
    this.auth.userAuthState.subscribe(val => {
        this.isSignedIn = val;
    });
    
  }

  // Signout
  signOut() {
    this.authService.signout().subscribe(val => {
      console.log(val);
  });
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }


}
