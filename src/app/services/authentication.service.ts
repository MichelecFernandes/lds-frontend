import { Injectable } from '@angular/core';
import { UserCredential } from '../domain/dto/user-credential';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { 

  }

  authentication(credential: UserCredential) {
    console.log (`tryin to authenticate...`);
    console.log (credential);

  }

  logout() {

  }

}
