import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../domain/model/user.model';
import { MatError } from '@angular/material/input';

@Component({
  selector: 'lds-my-profile',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatError
  ],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{
updateMyInformation() {
throw new Error('Method not implemented.');
}

  dataForm: FormGroup;
  email: string = '';
  user: User;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService
  ){

    this.initializeForm();

  }
  ngOnInit(): void {
    let user = this.authenticationService.getUserFromAuthentication();
    console.log('------------ my-profile --- dados no cache');
    console.log(user);

    let email = user.email;
    if(email == null){
      this.authenticationService.logout();
      this.router.navigate(['account/sign-in']);
      return;
    }

    this.setFormData(user);




  }

  initializeForm(){
    this.dataForm = this.formBuilder.group({
      fullName: ['', [Validators.required]]
    })

  }

  setFormData(user: User){
    this.user = user;
    this.dataForm.controls['fullName'].setValue(this.user.fullName);
    this.email = this.user.email;
  }

  updateInformation(){};

}
