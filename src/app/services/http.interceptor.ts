import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    private readonly token: string;

    constructor(cookieService: CookieService) {
        this.token = cookieService.get("userNormal")
        console.log(this.token);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(this.token);
        if (this.token) {
            console.log("Token aa " + this.token);
            const modReq = req.clone({
                setHeaders: {
                    'Authorization': "Bearer " + this.token
                }
            });
            return next.handle(modReq);
        }
        return next.handle(req);
    }
}