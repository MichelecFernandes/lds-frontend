import { Component, OnInit } from '@angular/core';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UserCredential } from '../../../domain/dto/user-credential';
import { AuthenticationService } from '../../../services/authentication.service';



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
export class SignInComponent implements OnInit {
  // email = new FormControl(null, Validators.email);
  email = new FormControl(null);
  password = new FormControl(null, [Validators.minLength(1), Validators.maxLength(10)]);

  isLoginIncorrect = false;


  constructor(private router: Router, private authenticationService: AuthenticationService){


  }

  
  ngOnInit(): void {
    this.loginIfCredentialsIsValid();
    
  }

  loginIfCredentialsIsValid(){
    if(this.authenticationService.isAutheticated()){
      this.router.navigate(['/']);
      return;
    }
  }

  login() {

    // let emailField = this.email.value
    // let passwordField = this.password.value

    let credential: UserCredential = {
      email: this.email.value!,
      password: this.password.value!
    };

    // console.log(`email digitado: ${credential.email}`);
    // console.log(`senha digitado: ${credential.password}`);
    console.log(credential);

    this.authenticationService
    .authenticate(credential)
    .subscribe(
      {
        next: (value) => {
          console.log(value);

          if(!value){
            return;
          }

          this.authenticationService.addCredentialsToLocalStorage(credential.email);

          this.router.navigate(['/']);

        },
        error: (err) => {
          console.error(err);

        }
      }
    );

    

  }


  isFormInvalid (){
    let isValid = this.email.valid && this.password.valid;
    return isValid ? false : true;
  }
}
