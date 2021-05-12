import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ListContactService {


  
  id: any;
  contact= new Contact();
  private apiURL = "http://127.0.0.1:8000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
    })
  }

  
  constructor(private http:HttpClient) { }

  // Method for get data from database using httpClient
  getContact()
  {
    return this.http.get(this.apiURL+ '/api/contacts/');
  }

  
  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiURL+ '/api/contacts/');
  }


  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  delete(id:number){
    return this.http.delete<Contact>(this.apiURL + '/api/delete/' + id , this.httpOptions);
  }
}
