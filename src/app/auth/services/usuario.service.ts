/** 
* DBR - Componentes propios de Angular
* */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';

/** 
* DBR - Interfaces
* */
import { CommonResponse } from 'src/app/shared/interfaces/http.interface';

/** 
* DBR - Servicios
* */
import { HttpService } from 'src/app/shared/services/http.service';

/** 
* DBR - Componentes propios de Rxjs
* */
import { Observable, of, from } from 'rxjs';
import { tap, catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {
    constructor(
        private srvHttpClient: HttpClient,
        private srvHttp: HttpService
    ) { }

    obtener(api: string, token: string): Observable<CommonResponse> {
        return this.srvHttp.httpGetBusquedaSinParametros("Usuario", "GetUsuarioData", api, token);
    }

    eliminarPorId(id: string, api: string, token: string, detailuser: string): Observable<CommonResponse> {
        return this.srvHttp.httpDeleteConToken('Usuario', 'DeleteUsuario', id, api, token, detailuser);
    }
}