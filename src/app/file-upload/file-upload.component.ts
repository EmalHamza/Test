import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent{

  // f = new FormGroup({
  //   myFile: new FormControl('', [Validators.required])
  // });

  constructor(private http: HttpClient, private router: Router) { }
      
  filedata:any;
    /* File onchange event */
    fileEvent(e:any){
        this.filedata = e.target.files[0];
    }
    /* Upload button functioanlity */
    onSubmitform(f: NgForm) {
       
      var myFormData = new FormData();
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      myFormData.append('image', this.filedata);
      /* Image Post Request */
      this.http.post('http://127.0.0.1:8000/api/fileUpload', myFormData, {
      headers: headers
      }).subscribe(data => {
       //Check success message
       //sweetalert message popup
        Swal.fire({
             title: 'Success',
             text:   "Image Upload successfully",
             icon: 'success'
         });
        //  this.f.reset();
      });  
  
  }
}
