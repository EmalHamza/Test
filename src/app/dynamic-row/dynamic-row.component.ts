import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Query } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddContactService } from '../add-contact.service';

@Component({
  selector: 'app-dynamic-row',
  templateUrl: './dynamic-row.component.html',
  styleUrls: ['./dynamic-row.component.css']
})
export class DynamicRowComponent implements OnInit {

  constructor(private contactService: AddContactService, private fb:FormBuilder) { }

  contactForm= new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', Validators.required),
    department_id: new FormControl('', Validators.required),
    country_id: new FormControl('', Validators.required),
    state_id: new FormControl('', Validators.required),
  });
  // itemRows: FormArray = new FormArray([]);
  
  // createItem(): FormGroup {
  //   return this.fb.group({
  //     province_id: "",
  //     district_id: ""
  //   });
  // }
  get itemRows() {
    return this.contactForm.get("itemRows") as FormArray;
  }
  deleteMyRelation(i:any) {
    this.itemRows.removeAt(i);
  }
  createItem(): FormGroup {
    return this.fb.group({
      province_id: "",
      district_id: ""
    });
  }

  // addItem(): void {
  //   this.itemRows = this.contactForm.get('itemRows') as FormArray;
  //   this.itemRows.push(this.createItem());
  // }
  addItem(): void {
    this.itemRows.push(this.createItem());
  }
    // contactForm= new FormGroup({
    //   province_id: new FormControl('', Validators.required),
    //     district_id: new FormControl('', Validators.required),
    //     itemRows:  this.fb.array([])
    // });
  ngOnInit() {
    // this.contactForm= this.fb.group({
    //   province_id: new FormControl('', Validators.required),
    //     district_id: new FormControl('', Validators.required),
    //     itemRows:  this.fb.array([this.initItemRows()])
    // });

    this.contactForm = this.fb.group({
      province_id: "",
      district_id: "",
      itemRows: this.fb.array([this.createItem()])
    });
    this.getProvinces();
    // this.contactForm = new FormGroup({
    //   province_id: new FormControl('', Validators.required),
    //   district_id: new FormControl('', Validators.required),
    //   'myRelations': new FormArray([])
    // });
    // this.getProvinces();
  }
  // get itemRows(){
  //   return this.contactForm.get('itemRows') as FormArray;
  // }

  initItemRows(){
    return this.fb.group({
      province_id:[''],
      district_id:['']
    });
  }
  // get myRelationsControls () {
  //   return this.contactForm.get('itemRows') as FormArray
  // }

  addRelationForm(){
    this.itemRows.push(this.initItemRows());
  }
  
  // deleteMyRelation(lessonIndex: number) {
  //   this.itemRows.removeAt(lessonIndex);
  // }

  provinces = <any>[];
  districts = <any[]>[];

  getProvinces() {
    this.contactService.getProvinces().subscribe(
      data => {
        this.provinces = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
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

  saveContact() {
    // const myfile = this.filedata;
    console.log(this.itemRows);
  }
}
