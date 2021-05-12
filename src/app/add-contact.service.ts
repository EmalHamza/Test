// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './contact.model';
import { ContactRelation } from './contactRelation.model';

@Injectable({
  providedIn: 'root'
})
export class AddContactService {

  id: any;
  contact = new Contact();
  contactRelation = new ContactRelation();
  department: any;
  private apiURL = 'http://127.0.0.1:8000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
    })
  }
  
  
 
  constructor(private http:HttpClient) { }

  getDepartments()
  {
    return this.http.get(this.apiURL+ '/api/departments/');
  }
  getCountries()
  {
    return this.http.get(this.apiURL+ '/api/countries/');
  }
  getProvinces()
  {
    return this.http.get(this.apiURL+ '/api/provinces/');
  }
  getDistricts()
  {
    return this.http.get(this.apiURL+ '/api/districts/');
  }
  getRelations()
  {
    return this.http.get(this.apiURL+ '/api/relations/');
  }
  getStates(country_id:any)
  {
    return this.http.get(this.apiURL+ '/api/state/' + country_id);
  }
  getDistrict(province_id:any):Observable<any>
  {
    return this.http.get(this.apiURL+ '/api/district/' + province_id);
  }
  getAllSate()
  {
    return this.http.get(this.apiURL+ '/api/state/');
  }

  create(data: any): Observable<any> {
    const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
    return this.http.post(this.apiURL + '/api/createContact/', data , {headers:headers});
  }
  createRelation(data: any): Observable<any> {
    return this.http.post(this.apiURL + '/api/createRelation/', data , this.httpOptions);
  }
  find(id:number): Observable<Contact> {
    return this.http.get<Contact>(this.apiURL + '/api/contacts/edit/' + id);
  }
  find2(id1:number){
    return this.http.get(this.apiURL + '/api/contacts/edit2/' + id1);
  }

  getData(id:number){
    return this.http.get(this.apiURL + '/api/contacts/edit2/' + id);
  }

  update(id:number, contact:any): Observable<Contact> {
    return this.http.put<Contact>(this.apiURL + '/api/contacts/update/' + id, JSON.stringify(contact), this.httpOptions);
  }

  profileUser() {
    return this.http.get(this.apiURL + '/api/userprofile', {headers: new HttpHeaders({'X-Requested-With':'XMLHttpRequest'})});
  }
}
