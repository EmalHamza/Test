import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Contact } from '../contact.model';
import { ListContactService } from '../list-contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  id: any;
  contact = new Contact();
  imagePath:any = "http://127.0.0.1:8000/public/img/";
  contacts = <any>[];
  constructor(private contactList:ListContactService, private router: Router) { }

  ngOnInit(){
    this.contactList.getAll().subscribe(
      data => {
        this.contacts = data ;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  retrieveContacts(): void {
    this.contactList.getAll()
      .subscribe(
        data => {
          this.contacts = data ;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  alertWithSuccess(){
    Swal.fire('Thank you...', 'Data updated succesfully!', 'success')
  }
  deleteContact(id:any){
    this.contactList.delete(id).subscribe(
      response => {
        console.log(response);
        this.alertWithSuccess();
        this.retrieveContacts();
        // this.router.navigateByUrl('list-contact');
      },
      error => {
        console.log(error);
    });
  }

}
