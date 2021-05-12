import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddContactService } from '../add-contact.service';
import { Contact } from '../contact.model';
import { ContactRelation } from '../contactRelation.model';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  
  imagePath:any = "http://127.0.0.1:8000/public/img/";

  transform(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.imagePath);
}

// base64Image='data:image/png;base64, /9j/4AAQSkZJRgABAQAAAQABAAD/2wBD.......';


  private apiURL = 'http://127.0.0.1:8000';
  id: any;
  id1: any;
  contact = new Contact();
  contact_relation = new ContactRelation();
  departments = <any>[
  ];
  data: any=[];
  data1: any=[];
  stateData: any;
  // fieldArray:any;
  states=<any>[];
  countries=<any>[];

  provinces = <any>[];
  district_id=<any>[];
  districts = <any>[];
  districtData = <any>[];
  districts2 = <any[]>[];
  district=[]

  relations = <any>[];

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', Validators.required),
    department_id: new FormControl('', Validators.required),
    state_id: new FormControl('', Validators.required),
    country_id: new FormControl('', Validators.required),
    relation_id: new FormControl('', Validators.required),
    itemRows: this.fb.array([this.createItem()])

  });
   
  constructor(
    public contactService: AddContactService,
    private route: ActivatedRoute,
    private router: Router, private http: HttpClient, private fb:FormBuilder, private sanitizer:DomSanitizer
  ) { }
   
  alertWithSuccess(){
    Swal.fire('Thank you...', 'Data updated succesfully!', 'success')
  }
  cancel(){
    this.contactForm.reset();
  }
  getRelation(){
    this.contactService.getRelations().subscribe(
      data => {
        this.relations = data;
        // console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  getProvinces(){
    this.contactService.getProvinces().subscribe(
      data => {
        this.provinces = data;
        // console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  createItem(): FormGroup {
    return this.fb.group({
      province_id: "",
      district_id: "",
      relation_id: "",
      name: "",
      phone: ""
    });
  }
  addItem(): void {
    this.itemRows.push(this.createItem());
  }
  get itemRows() {
    return this.contactForm.get("itemRows") as FormArray;
  }
  onChangeProvince(i:any) {
    // console.log(event);
    this.contactService.getDistrict(this.itemRows.get(i + ".province_id")!.value)
    .subscribe(
      data => {
        this.districts = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  // ngOnInit() {
  //   this.contactForm = this.fb.group({
  //     name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //     fName: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //     email: new FormControl('', [Validators.required, Validators.email]),
  //     mobile: new FormControl('', Validators.required),
  //     department_id: new FormControl('', Validators.required),
  //     state_id: new FormControl('', Validators.required),
  //     country_id: new FormControl('', Validators.required),
  //     itemRows: this.fb.array([])
  //     });
  //   this.id = this.route.snapshot.params['id'];
  //   this.id1 = this.route.snapshot.params['id'];     
  //   this.contactService.find(this.id1).subscribe(res=>{
  //     this.data = res;
  //     this.contact = this.data;
  //     if(this.contact.country_id){
  //       this.getState(this.contact.country_id)
  //     }
  //   });
  //   this.contactService.find2(this.id).subscribe(res=>{
  //     this.data1 = res;
  //     this.contact_relation = this.data1;
  //     console.log('sss',this.data1);
  //     let formArr = this.contactForm.get("itemRows") as FormArray;
      
  //     this.data1.forEach((x: { province_id: any; district_id: any; phone: any; typeName: any; name: any; relation_id: any; }) =>{
  //       // this.districts$[x.province_id]
  //         // this.contactService.getDistrict(x.province_id).subscribe(data => {
  //         //   this.districts[x.province_id] = data;
  //         // })
         
  //         const district_id= x.district_id;
  //         const province_id= x.province_id;
  //         var obj ={
  //           province_id: province_id
  //         }
  //         this.contactService.getDistrict(obj).subscribe(data => {
  //           this.districts[district_id] = data;
  //         });

  //         // this.contactService.getDistrict(province_id).subscribe(data => {
  //         //   this.districts[district_id] = data;
  //         // });
  //       // if(province_id){
  //       //   // this.getDistricts(x.province_id);
  //       //   this.contactService.getDistrict(province_id).subscribe(data => {
  //       //     this.districts[x.district_id] = data;
  //       //     this.districts[x.district_id] = this.districts[x.district_id];
  //       //   })
  //       // }
  //         // const district_id= x.id;
          
        
  //       formArr.push(this.fb.group({
  //         province_id: x.province_id,
  //         district_id: x.district_id,
  //         phone: x.phone,
  //         name: x.name,
  //         relation_id: x.relation_id,
  //       }))
  //     })
  //     // console.log('Form Array', formArr);
  //   });

  //   this.contactService.getCountries().subscribe(data =>{
  //     this.countries = data;
  //   });

  //   this.contactService.getDepartments().subscribe(data=>{
  //     this.departments = data;
  //   });
  //   this.getProvinces();
  //   // this.getCountry();
  //   this.getRelation();
  //   this.getProvinces();
  // }

  selectedDistrict: any;
  ngOnInit() {
    // this.contactForm = this.fb.group({
    //   itemRows: this.fb.array([this.createItem()])
    //   });
      this.contactForm = this.fb.group({
            name: new FormControl('', [Validators.required, Validators.minLength(3)]),
            fName: new FormControl('', [Validators.required, Validators.minLength(3)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            mobile: new FormControl('', Validators.required),
            department_id: new FormControl('', Validators.required),
            state_id: new FormControl('', Validators.required),
            country_id: new FormControl('', Validators.required),
            itemRows: this.fb.array([])
            });
this.id = this.route.snapshot.params['id'];
this.contactService.find(this.id).subscribe(res=>{
      this.data = res;
      this.contact = this.data;
      if(this.contact.country_id){
        this.getState(this.contact.country_id)
      }
    });

this.contactService.getData(this.id).subscribe(res=>{
      this.data1 = res;
      let formArr = this.contactForm.get("itemRows") as FormArray;
      this.data1.forEach((x: { province_id: any; district_id: any; phone: any; name: any; relation_id: any; }) =>{
        const district_id= x.district_id;
          const province_id= x.province_id;  
        formArr.push(this.fb.group({
          province_id: x.province_id,
          district_id: x.district_id,
          phone: x.phone,
          name: x.name,
          relation_id: x.relation_id,
        }))
        this.district_id = x.district_id;
        this.getDistricts(x.province_id);
        this.selectedDistrict = district_id;
          
          // this.contactService.getDistrict(x.province_id).subscribe(data => {
          //   this.districts[x.district_id] = data;
          // });
          
      })
      

    });
    
    this.contactService.getCountries().subscribe(data =>{
          this.countries = data;
        });
    
        this.contactService.getDepartments().subscribe(data=>{
          this.departments = data;
        });

     this.getRelation();
      this.getProvinces();
}

  deleteMyRelation(i: number) {
    this.itemRows.removeAt(i);
  }
  onChangeCountry(country_id:any){
    this.contactService.getStates(country_id).subscribe(data => {
      this.states = data;
      country_id = country_id
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }
  getState(country_id:any){
    var obj ={
      country_id: country_id
    }
    this.contactService.getStates(obj).subscribe(data => {
      this.states = data;
    });
  }
  getDistricts(i:any){
    var obj ={
      province_id: i
    }
    this.contactService.getDistrict(i).subscribe(data => {
      this.districts = data;
    });
  }
  
  get f(){
    return this.contactForm.controls;
  }

  filedata:any
  /* File onchange event */
  fileEvent(e:any){
      this.filedata = e.target.files[0];
  }

  submit(){
    const data = {
      name: this.contactForm.value.name,
      fName: this.contactForm.value.fName,
      email: this.contactForm.value.email,
      mobile: this.contactForm.value.mobile,
      department_id: this.contactForm.value.department_id,
      state_id: this.contactForm.value.state_id,
    };

    var myFormData = new FormData();
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      myFormData.append('image', this.filedata);
    // console.log(myFormData);
    myFormData.append('data', JSON.stringify(data));
    myFormData.append('data1', JSON.stringify(this.itemRows.value));

    console.log(this.contactForm.value);
    this.contactService.update(this.id, myFormData).subscribe(
      response => {
        console.log(response);
        this.alertWithSuccess();
        this.contactForm.reset();
        this.router.navigateByUrl('list-contact');
      },
      error => {
        console.log(error);
    });
  }


}
