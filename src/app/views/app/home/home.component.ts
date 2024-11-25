import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { User } from '../../../domain/model/user.model';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lds-home',
  standalone: true,
  imports: [
    NgIf,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  user: User;

  constructor(private authenticationService: AuthenticationService){

  }
  ngOnInit(): void {
    console.log('--- home ---');
    this.user = this.authenticationService.getUserFromAuthentication();
    console.log(this.user);
  }

  showMessage(message: string){
    alert('Mensagem: ' + message);
  }

}
