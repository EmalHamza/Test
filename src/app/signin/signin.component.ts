import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStateService } from '../shared/auth-state.service';
import { AuthService } from '../shared/auth.service';
import { TokenService } from '../shared/token.service';
import { User } from '../user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user: User = {
    email: '',
    password: ''
  };

  userData: any;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  // loginForm: FormGroup;
  errors = null;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService, private route: ActivatedRoute
  ) {
    // this.loginForm = this.fb.group({
    //   email: [],
    //   password: []
    // })
  }

  ngOnInit() { }

  loginUser(form:NgForm) {
    // const data = {
    //   email: this.loginForm.value.email,
    //   password: this.loginForm.value.password,
    // };
      this.authService.signin(form.value.email, form.value.password).subscribe(
        result => {
          const auth_token = result;
          this.responseHandler(auth_token);
          this.userData = auth_token;
          // console.log(this.userData);
          // localStorage.setItem('auth_totken', JSON.stringify(result));
        // },
        // error => {
        //   this.errors = error.error;
        // },() => {
          this.authState.setAuthState(true);
          // this.loginForm.reset()
          // this.router.navigate(['profile']);
          this.router.navigateByUrl('profile', this.userData);
        }
      );
  }

  // Handle response
  responseHandler(data:any){
    this.token.handleData(data.access_token);
  }
}
