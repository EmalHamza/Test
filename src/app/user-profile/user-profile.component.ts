import { Component, OnInit } from '@angular/core';
import { AddContactService } from '../add-contact.service';
import { AuthStateService } from '../shared/auth-state.service';
import { AuthService } from '../shared/auth.service';
import { TokenService } from '../shared/token.service';

export class User {
  name?: String;
  email?: String;
}


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userD= User;
  userData:any;
  constructor(private authService: AuthService, private token: TokenService, private authState: AuthStateService) { 
    // this.authService.profileUser().subscribe(data => {
    //   data = this.userD;
    //   console.log('this is' , data);
    // })
  }

  user:any;

  responseHandler(data:any){
    this.token.handleData(data.access_token);
  }
  ngOnInit() {
    this.authService.profileUser().subscribe(
      result => {
        const auth_token = result;
          this.responseHandler(auth_token);
          this.userData = auth_token;
          this.authState.setAuthState(true);
      }
    );
  }
}
