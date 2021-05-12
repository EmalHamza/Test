import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import {Routes,RouterModule} from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddContactService } from './add-contact.service';
import { ListContactService } from './list-contact.service';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthInterceptor } from './shared/auth.interceptor';
import { RelationComponent } from './relation/relation/relation.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DynamicRowComponent } from './dynamic-row/dynamic-row.component';


const myRoutes:Routes =[
  { path: 'add-contact', component: AddContactComponent },
  { path: 'list-contact', component: ContactListComponent },
  { path: 'register', component: SignupComponent },
  { path: 'login', component: SigninComponent },
  { path: 'relation', component: RelationComponent },
  { path: 'dynamic', component: DynamicRowComponent },
  { path: 'upload', component: FileUploadComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'edit/:id', component: EditContactComponent },
  { path: '', component: HomeComponentComponent },

]


@NgModule({
  declarations: [
    AppComponent,
    AddContactComponent,
    NavbarComponent,
    ContactListComponent,
    EditContactComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    RelationComponent,
    FileUploadComponent,
    DynamicRowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    AppRoutingModule, HttpClientModule,
    RouterModule.forRoot(myRoutes),
    CommonModule
    
  ],
  providers: [
    AddContactService,
    ListContactService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
