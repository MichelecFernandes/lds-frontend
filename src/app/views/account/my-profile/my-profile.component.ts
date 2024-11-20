import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lds-my-profile',
  standalone: true,
  imports: [],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService
  ){

    this.initializeForm();

  }
  ngOnInit(): void {
    let authenticatedUser = this.authenticationService.getAuthenticatedUser();
    console.log('------------ my-profile --- dados no cache');
    console.log(authenticatedUser);
  }

  initializeForm(){};

}
