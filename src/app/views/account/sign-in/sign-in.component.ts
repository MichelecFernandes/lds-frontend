import { Component } from '@angular/core';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';



@Component({
  selector: 'lds-sign-in',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  // email = new FormControl(null, Validators.email);
  email = new FormControl(null);
  password = new FormControl(null, [Validators.minLength(1), Validators.maxLength(10)]);

  isLoginIncorrect = false;


  constructor(private router: Router){


  }

  login() {
    let emailField = this.email.value
    let passwordField = this.password.value
    console.log(`email digitado: ${emailField}`);
    console.log(`senha digitado: ${passwordField}`);

    this.router.navigate(['/']);

  }


  isFormInvalid (){
    let isValid = this.email.valid && this.password.valid;
    return isValid ? false : true;
  }
}
