import { Injectable } from '@angular/core';
import { UserCredential } from '../domain/dto/user-credential';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthenticatedUser } from '../domain/dto/authenticated-user.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { 

  }

  //Modelo antigo - 18/11/2024
  // async authenticate(credential: UserCredential){
  //   console.log (`tryin to authenticate...`);
  //   console.log (credential);
  //   let apiResponse = await firstValueFrom(this.http.get<UserCredential[]>(`${environment.api_endpoint}/user?email=${credential.email}&password=${credential.password}`));
  //   console.log(apiResponse);
  //   if (apiResponse == null || apiResponse.length != 1) {
  //     throw new Error('dados invalidos');
  //   }
  //   return true;
  // }

  authenticate(credential: UserCredential): Observable<any>{
    console.log (`tryin to authenticate...`);
    console.log (credential);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      email: credential.email,
      password: credential.password,
    };


    return this.http.post<any>(`${environment.authentication_api_endpoint}/authenticate`, body, { headers })
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

  // addCredentialsToLocalStorage(email: string){
  //   localStorage.setItem('email', email);
  //   localStorage.setItem('token', new Date().toLocaleTimeString());
  // }

  addCredentialsToLocalStorage(authenticatedUser: AuthenticatedUser){
    localStorage.setItem('email', authenticatedUser.email);
    localStorage.setItem('fullName', authenticatedUser.fullName);
    localStorage.setItem('role', authenticatedUser.role);
    localStorage.setItem('token', authenticatedUser.token);
  
  }

}
