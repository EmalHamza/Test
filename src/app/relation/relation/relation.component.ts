import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddContactService } from 'src/app/add-contact.service';
import { ContactRelation } from 'src/app/contactRelation.model';
// import { Relation } from 'src/app/relation.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-relation',
  templateUrl: './relation.component.html',
  styleUrls: ['./relation.component.css']
})
export class RelationComponent implements OnInit {

    relation = new ContactRelation();
    fieldArray: Array<any> = [];
    newAttribute: any = {};
    relations = <any>[];

    addFieldValue() {
      this.fieldArray.push(this.newAttribute)
      this.newAttribute = {};
  }

 
    get f(){
      return this.relationContactForm.controls;
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

    relationContactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
    });

    deleteFieldValue(index:any) {
        this.fieldArray.splice(index, 1);
    }

  constructor(private contactService: AddContactService, private router:Router) { }

  ngOnInit(): void {
    this.getRelation();
  }
  alertWithSuccess(){
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
  }


  saveRelation(): void {
    const data = {
      name: this.relationContactForm.value.name,
      phone: this.relationContactForm.value.phone
    };

    // var json = JSON.stringify(this.contactForm);
    this.contactService.createRelation(data)
      .subscribe(
        response => {
          console.log(response);
          this.alertWithSuccess();
          this.relationContactForm.reset();
          this.router.navigateByUrl('list-contact');
        },
        error => {
          console.log(error);
      });
  }

}
