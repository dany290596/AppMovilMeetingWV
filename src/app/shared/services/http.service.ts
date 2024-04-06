/** 
* DBR - Componentes propios de Angular
* */
import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, from, map, Observable, of } from 'rxjs';

/** 
* DBR - Componentes propios de Ionic
* */
import { NavController } from '@ionic/angular';
import { MenuController, AlertController } from '@ionic/angular';

/** 
* DBR - Interfaces
* */
import { CommonResponse } from "src/app/shared/interfaces/http.interface";

/** 
* DBR - Servicios
* */
import { StorageService } from 'src/app/shared/services/storage.service';
import { Preferences } from '@capacitor/preferences';

/** 
* DBR - Capacitor
* */
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
    providedIn: 'root'
})

export class HttpService {
    constructor(
        private srvStorage: StorageService,
        private srvHttp: HttpClient,
        private srvNav: NavController,
        private srvMenu: MenuController
    ) { }

    /** 
* DBR - Metodo que (REALIZA UNA SOLICITUD DE TIPO POST)
* @param controlador
* @param objeto
* @param api
* @returns
* */
    httpPostSinToken(
        controlador: string,
        objeto: any,
        api: string
    ): Observable<CommonResponse> {
        const opciones = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        const url = (`${api + controlador}`);
        //alert("URL ::: " + JSON.stringify(url));
        return this.srvHttp.post<CommonResponse>(url, objeto, opciones)
            .pipe(
                map((t: CommonResponse) => {
                    if (t.data) {
                        this.srvStorage.crear('token', JSON.stringify(t.data));
                    }
                    return t;
                }),
                catchError((e) => of(e))
            );
    }

    /** 
* DBR - Metodo que (REALIZA UNA SOLICITUD DE TIPO POST)
* @param controlador
* @param metodo
* @param objeto
* @param api
* @param token
* @param detailuser
* @returns
* */
    httpPostConToken(
        controlador: string,
        metodo: string,
        objeto: any,
        api: string,
        token: string,
        detailuser: any
    ): Observable<CommonResponse> {
        const opciones = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Empresa': `${detailuser.empresaId}`
            })
        };

        const url = (`${api + controlador}/${metodo}`);
        //alert("URL ::: " + JSON.stringify(url));
        return this.srvHttp.post<CommonResponse>(url, objeto, opciones)
            .pipe(
                map((t: CommonResponse) => {
                    if (t.data) {
                    }
                    return t;
                }),
                catchError((e) => of(e))
            );
    }

    /** 
* DBR - Metodo que (REALIZA UNA SOLICITUD DE TIPO PUT)
* @param controlador
* @param metodo
* @param id
* @param objeto
* @param api
* @param token
* @param detailuser
* @returns
* */
    httpPutConToken(
        controlador: string,
        metodo: string,
        id: string,
        objeto: any,
        api: string,
        token: string,
        detailuser: any
    ): Observable<CommonResponse> {
        const opciones = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Empresa': `${detailuser.empresaId}`
            })
        };

        const url = (`${api + controlador}/${metodo}?id=${id}`);
        // alert("URL ::: " + JSON.stringify(url));
        // console.log("URL ::: ", url);
        // console.log("TOKEN ::: ", token);
        // console.log("EMPRESA ::: ", detailuser.empresaId);
        return this.srvHttp.put<CommonResponse>(url, objeto, opciones)
            .pipe(
                map((t: CommonResponse) => {
                    if (t.data) {
                    }
                    return t;
                }),
                catchError((e) => of(e))
            );
    }

    /** 
* DBR - Metodo que (REALIZA UNA SOLICITUD DE TIPO GET)
* @param controlador
* @param metodo
* @param api
* @param token
* @returns
* */
    httpGetBusquedaSinParametros(
        controlador: string,
        metodo: string,
        api: string,
        token: string
    ): Observable<CommonResponse> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };

        const url = (`${api}${controlador}/${metodo}`);
        //console.log("URL ::: ", url);
        return this.srvHttp.get<CommonResponse>(url, httpOptions)
            .pipe(map((t: CommonResponse) => {
                //console.log(t);
                if (t.data) {
                    this.srvStorage.crear('detailuser', JSON.stringify(t.data));
                    //this.srvNav.navigateRoot('/protected/modulo-visitante/pages/visitante');
                    this.srvMenu.enable(true);
                }
                return t;
            }), catchError((e: any) => of(e))
            );
    }

    /** 
* DBR - Metodo que (REALIZA UNA SOLICITUD DE TIPO GET)
* @param controlador
* @param metodo
* @param parametros
* @param api
* @param token
* @param detailuser
* @returns
* */
    httpGetBusquedaConParametros(
        controlador: string,
        metodo: string,
        parametros: any,
        api: string,
        token: string,
        detailuser: any
    ): Observable<CommonResponse> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Empresa': `${detailuser.empresaId}`
            }),
            params: parametros
        };

        const url = (`${api}${controlador}/${metodo}`);
        // console.log("URL ::: ", url);
        // console.log("TOKEN ::: ", token);
        // console.log("EMPRESA ::: ", detailuser.empresaId);
        return this.srvHttp.get<CommonResponse>(url, httpOptions)
            .pipe(map((t: CommonResponse) => {
                return t;
            }), catchError((e: any) => of(e))
            );
    }

    /** 
* DBR - Metodo que (REALIZA UNA SOLICITUD DE TIPO GET)
* @param controlador
* @param metodo
* @param parametro
* @param api
* @param token
* @param detailuser
* @returns
* */
    httpGetBusquedaConParametro(
        controlador: string,
        metodo: string,
        parametro: string,
        api: string,
        token: string,
        detailuser: any
    ): Observable<CommonResponse> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Empresa': `${detailuser.empresaId}`
            })
        };

        const url = (`${api}${controlador}/${metodo}/${parametro}`);
        // console.log("URL ::: ", url);
        // console.log("TOKEN ::: ", token);
        // console.log("EMPRESA ::: ", detailuser.empresaId);
        return this.srvHttp.get<CommonResponse>(url, httpOptions)
            .pipe(map((t: CommonResponse) => {
                return t;
            }), catchError((e: any) => of(e))
            );
    }

    /** 
* DBR - Metodo que (REALIZA UNA SOLICITUD DE TIPO GET)
* @param controlador
* @param metodo
* @param parametro
* @param api
* @param token
* @param detailuser
* @returns
* */
    httpDeleteConToken(
        controlador: string,
        metodo: string,
        parametro: string,
        api: string,
        token: string,
        detailuser: any
    ): Observable<CommonResponse> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Empresa': `${detailuser.empresaId}`
            })
        };

        const url = (`${api}${controlador}/${metodo}/${parametro}`);
        // console.log("URL ::: ", url);
        // console.log("TOKEN ::: ", token);
        // console.log("EMPRESA ::: ", detailuser.empresaId);
        return this.srvHttp.delete<CommonResponse>(url, httpOptions)
            .pipe(map((t: CommonResponse) => {
                return t;
            }), catchError((e: any) => of(e))
            );
    }
}