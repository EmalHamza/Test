import { Component, OnInit } from '@angular/core';
import {Contact} from '../contact.model';
import { AddContactService } from '../add-contact.service';
import { Observable } from 'rxjs';
import { HttpClient ,HttpHeaders,HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  contact = new Contact();

  departments = <any>[];
  relations = <any>[];
  countries = <any>[];
  provinces = <any>[];
  districts = <any[]>[];
  states = <any>[];
  contacts = <any>[];
  title = 'Contact';
  country_id:any;

  deleteMyRelation(i: number) {
    this.itemRows.removeAt(i);
  }


  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    department_id: new FormControl('', Validators.required),
    state_id: new FormControl('', Validators.required),
    country_id: new FormControl('', Validators.required),
    itemRows: new FormArray([])
  });

  get f(){
    return this.contactForm.controls;
  }

  constructor(private contactService: AddContactService, private fb: FormBuilder,
    private http: HttpClient,
    private router: Router) {
  }

  createItem(): FormGroup {
    return this.fb.group({
      province_id: new FormControl('', Validators.required),
      district_id: new FormControl('', Validators.required),
      typeName: new FormControl('', Validators.required),
      rel_name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
    });
  }
  addItem(): void {
    this.itemRows.push(this.createItem());
  }
  ngOnInit():void{
    

    this.contactForm = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', Validators.required),
    department_id: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    state_id: new FormControl('', Validators.required),
    country_id: new FormControl('', Validators.required),
    itemRows: this.fb.array([this.createItem()])
    });
    this.getProvinces();
    this.getCountry();
    this.getRelation();
    this.getProvinces();
    
    this.contactService.getDepartments().subscribe(
      data => {
        this.departments = data ;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
  getRelation(){
    this.contactService.getRelations().subscribe(
      data => {
        this.relations = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
  getCountry(){
    this.contactService.getCountries().subscribe(
      data => {
        this.countries = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
  getProvinces(){
    this.contactService.getProvinces().subscribe(
      data => {
        this.provinces = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
  
  onChangeCountry(event:any){
    console.log(event);
    this.contactService.getStates(event.target.value).subscribe(
      data => {
        this.states = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  get itemRows() {
    return this.contactForm.get("itemRows") as FormArray;
  }
  onChangeProvince(i:any) {
    // console.log(event);
    this.contactService.getDistrict(this.itemRows.get(i + ".province_id")!.value)
    .subscribe(
      data => {
        this.districts[i] = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  alertWithSuccess(){
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
  }

  cancel():void{
    this.contactForm.reset();
  }

  filedata:any
    /* File onchange event */
    fileEvent(e:any){
        this.filedata = e.target.files[0];
    }
  saveContact() {
    // const myfile = this.filedata;
    // console.log(this.itemRows);
    const data = {
      name: this.contactForm.value.name,
      fName: this.contactForm.value.fName,
      email: this.contactForm.value.email,
      mobile: this.contactForm.value.mobile,
      department_id: this.contactForm.value.department_id,
      state_id: this.contactForm.value.state_id,
    };
    // const data1= this.itemRows.value;
    
    // console.log(data1);
    var myFormData = new FormData();
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      myFormData.append('image', this.filedata);
    // console.log(myFormData);
    myFormData.append('data', JSON.stringify(data));
    myFormData.append('data1', JSON.stringify(this.itemRows.value));
    // console.log(myFormData);
    // myFormData.append('item_row', JSON.stringify(this.itemRows));
    
    this.contactService.create(myFormData)
      .subscribe(
        response => {
          // console.log(response);
          this.alertWithSuccess();
        },
        error => {
          console.log(error);
      });
  }


}
