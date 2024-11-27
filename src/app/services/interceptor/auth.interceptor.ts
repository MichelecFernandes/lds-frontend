import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthenticationService } from "../authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authenticationService: AuthenticationService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('requisicao foi interceptada. Url:' + req.url);

        if(req.url === environment.authentication_api_endpoint){
            return next.handle(req)
        }

        let authenticatedUser;
        try{
            authenticatedUser = this.authenticationService.getAuthenticatedUser();
        }catch(error){
            return next.handle(req);
        }

        if(authenticatedUser == null || !authenticatedUser.token){
            return next.handle(req);
        }

        const token = authenticatedUser.token;

        if(token){
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                }
            });
        }

        return next.handle(req);
    }
    
}