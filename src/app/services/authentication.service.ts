import { Injectable } from '@angular/core';
import { UserCredential } from '../domain/dto/user-credential';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { 

  }

  authenticate(credential: UserCredential): Observable<any> {
    console.log (`tryin to authenticate...`);
    console.log (credential);

    return this.http.get('http://localhost:3000/user/1');

  }

  logout() {
    localStorage.clear();

  }
  isAutheticated(): boolean{
    let token = localStorage.getItem('token');

    if(token != null){
      return true;
    }
    return false;
  }

  addCredentialsToLocalStorage(email: string){
    localStorage.setItem('email', email);
    localStorage.setItem('token', new Date().toLocaleTimeString());

  }

}
