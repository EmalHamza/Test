import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from './shared/auth-state.service';
import { AuthService } from './shared/auth.service';
import { TokenService } from './shared/token.service';

export class User{
  name?: string;
  email?: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DABS-Application';

  isSignedIn: boolean = false;

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService, private authService: AuthService
  ) {
    this.authService.profileUser().subscribe((data:User) => {
      // const user = data;
      console.log(data);
    })
  }

  ngOnInit() {
    this.auth.userAuthState.subscribe(val => {
        this.isSignedIn = val;
    });
  }

  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }

}
