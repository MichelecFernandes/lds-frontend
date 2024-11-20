import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UserCredential } from '../../../domain/dto/user-credential';
import { AuthenticationService } from '../../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticatedUser } from '../../../domain/dto/authenticated-user.dto';



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


  constructor(private router: Router, private authenticationService: AuthenticationService, private toastrService: ToastrService) {


  }


  ngOnInit(): void {
    this.loginIfCredentialsIsValid();

  }

  loginIfCredentialsIsValid() {
    if (this.authenticationService.isAutheticated()) {
      this.router.navigate(['/']);
      return;
    }
  }

  //  async login() {

  //   // let emailField = this.email.value
  //   // let passwordField = this.password.value

  //   let credential: UserCredential = {
  //     email: this.email.value!,
  //     password: this.password.value!
  //   };

  //   // console.log(`email digitado: ${credential.email}`);
  //   // console.log(`senha digitado: ${credential.password}`);
  //   console.log(credential);

  //   // this.authenticationService
  //   // .authenticate(credential)
  //   // .subscribe(
  //   //   {
  //   //     next: (value) => {
  //   //       console.log(value);

  //   //       if(!value){
  //   //         return;
  //   //       }

  //   //       this.authenticationService.addCredentialsToLocalStorage(credential.email);

  //   //       this.router.navigate(['/']);

  //   //     },
  //   //     error: (err) => {
  //   //       console.error(err);

  //   //     }
  //   //   }
  //   // );
  //   try {
  //     await this.authenticationService.authenticate(credential);
  //     this.authenticationService
  //       .addCredentialsToLocalStorage(credential.email);

  //     await this.router.navigate(['/']);
  //   } catch (e: any) {
  //     console.error(`erro: ${e}`);
  //     this.toastrService.error(e.message);
  //     this.password.setValue(null);
  //   }

  // }

  async login() {

    let credential: UserCredential = {
      email: this.email.value!,
      password: this.password.value!
    };

    console.log(credential);

    try {
      this.authenticationService.authenticate(credential)
      .subscribe({
        next: (value: any) => {
          console.log('---- sucesso -----');
          console.log(value);
          const token = value.token;
          console.log('------- token -----');
          console.log(token);

          //Exemplo de token:
          //eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU5JU1RSQVRPUiIsImZ1bGxOYW1lIjoidGlidXJzc2luIHRpYnVyc3NpdXMiLCJlbWFpbCI6ImFAYSIsInN1YiI6ImFAYSIsImlhdCI6MTczMjA2NDI0MCwiZXhwIjoxNzMyMDY3ODQwfQ.Wupoms-_FOGSMRZEC9G0YWY5SZNBk5Yvk991945VJDo

          //[0] = eyJhbGciOiJIUzI1NiJ9
          //[1] = eyJyb2xlIjoiQURNSU5JU1RSQVRPUiIsImZ1bGxOYW1lIjoidGlidXJzc2luIHRpYnVyc3NpdXMiLCJlbWFpbCI6ImFAYSIsInN1YiI6ImFAYSIsImlhdCI6MTczMjA2NDI0MCwiZXhwIjoxNzMyMDY3ODQwfQ
          //[2] = Wupoms-_FOGSMRZEC9G0YWY5SZNBk5Yvk991945VJDo

          const payload = token.split('.')[1];

          console.log('----  payload ----');
          console.log(payload);
          const decodePayLoad = atob(payload);
          const decodedData = JSON.parse(decodePayLoad);

          console.log('---- decodedData -----');
          console.log(decodedData);

          const email = decodedData.sub;
          const fullName = decodedData.fullName;
          const role = decodedData.role;

          console.log('----- conteudo ----');
          console.log(email);
          console.log(fullName);
          console.log(role);


          let user: AuthenticatedUser = {
            role: role,
            email: email,
            fullName: fullName,
            token: token
          };

          console.log('----- AuthenticatedUser ----');
          console.log(user);
        

          this.authenticationService.addCredentialsToLocalStorage(user);
          this.router.navigate(['']);

        }, 


        error: (err) => {
          console.error('---- erro -----');
          console.error(err);
        }
      });
      

    } catch (e: any) {
      console.error(`erro: ${e}`);
      this.toastrService.error(e.message);
      this.password.setValue(null);
    }

  }

  isFormInvalid() {
    let isValid = this.email.valid && this.password.valid;
    return isValid ? false : true;
  }
}
