import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './../user.model';

// // User interface
// export class User {
//   name: String | undefined;
//   email: String | undefined;
//   password!: String;
//   password_confirmation: String | undefined;
// }
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  id: any;
  private apiURL = 'http://127.0.0.1:8000';
  user: User = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
    })
  }
  constructor(private http: HttpClient) { }

  // User registration
  register(data: any): Observable<any> {
    console.log(data);
    // return this.http.post('http://127.0.0.1:8000/api/auth/register', user);
    return this.http.post(this.apiURL + '/api/register/', data , this.httpOptions);
  }
  
  // Login
  signin(email:string, password:string) {
    // return this.http.post<any>('http://127.0.0.1:8000/api/auth/login', user);
    return this.http.post(this.apiURL + '/api/auth/login', {email:email, password:password} ,
    {headers: new HttpHeaders({'X-Requested-With':'XMLHttpRequest'})});
  }

  signout() {
    // return this.http.post<any>('http://127.0.0.1:8000/api/auth/login', user);
    return this.http.get(this.apiURL + '/api/auth/logout');
  }
  // Access user profile
  profileUser() {
    return this.http.get(this.apiURL + '/api/auth/userprofile');
  }
}
