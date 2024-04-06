/** 
* DBR - Componentes propios de Angular
* */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/** 
* DBR - Interfaces
* */
import { LoginRequest } from "src/app/auth/interfaces/login.interface";
import { CommonResponse } from "src/app/shared/interfaces/http.interface";

/** 
* DBR - Servicios
* */
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    constructor(
        private srvHttp: HttpService,
    ) { }

    accederConCuenta(objeto: LoginRequest, api: string): Observable<CommonResponse> {
        return this.srvHttp.httpPostSinToken("Login", objeto, api);
    }
}