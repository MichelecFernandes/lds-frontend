import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'lds-sign-up',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  form: FormGroup;
  fullNameMinLength: number = 2;
  fullNameMaxLength: number = 10;

  constructor(private formBuilder: FormBuilder){
    this.initializeForm();


  }


  initializeForm(){
    this.form = this.formBuilder.group({

      fullName:['', [
        Validators.required,
        Validators.minLength(this.fullNameMinLength),
        Validators.maxLength(this.fullNameMaxLength)
      ]],
      email:['', [
        Validators.required,
        Validators.email
      ]],
      password:['', [
        Validators.required,
        Validators.minLength(this.fullNameMinLength),
        Validators.maxLength(this.fullNameMaxLength)
      ]],
      repeatPassword:['', [
        Validators.required,
        Validators.minLength(this.fullNameMinLength),
        Validators.maxLength(this.fullNameMaxLength)
      ]],

    });

  }

  // fullName = new FormControl(null, [Validators.minLength(3), Validators.maxLength(10)]);
  // email = new FormControl(null, Validators.email);
  // password = new FormControl(null, [Validators.minLength(3), Validators.maxLength(10)]);
  // repeatPassword = new FormControl(null, [Validators.minLength(3), Validators.maxLength(10)]);

  isFormInvalid(){
    // let isValid = this.fullName.valid && this.email.valid && this.password.valid && this.repeatPassword.valid;

    // if(this.password.value !== this.repeatPassword.value){
    //   return true;
    // }
    let isValid = this.form.controls['fullName'].valid && this.form.controls['email'].valid && this.form.controls['password'].valid && this.form.controls['repeatPassword'].valid;

    if(this.form.controls['password'].value !== this.form.controls['repeatPassword'].value){
      return true;
    }
    return isValid ? false : true;

  }

  createAccount(){
    console.log('criando conta')
  }

}
