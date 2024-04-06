/** 
 * DBR - Componentes Propios de Angular
 * */
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/** 
 * DBR - Componentes propios de Rxjs
 * */
import { Observable, of, from } from 'rxjs';
import { tap, catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class JsonService {
    constructor(
        private srvHttpClient: HttpClient
    ) { }

    /**
* DBR - Metodo que (OBTIENE LOS MODULOS Y SUBMODULOS DE LA APLICACIÒN)
* @param 
* @returns
*/
    obtenerMenu(): Observable<any[]> {
        var menuResponse = this.srvHttpClient.get<any[]>(`../../../../../assets/json/menu/Menu.json`);
        console.log(menuResponse);
        return menuResponse;
    }

    /**
* DBR - Metodo que (OBTIENE LAS PRIORIDADES)
* @param 
* @returns
*/
    obtenerPrioridad(): Observable<any[]> {
        var prioridadResponse = this.srvHttpClient.get<any[]>(`../../../../../assets/json/catalogos/PrioridadResponse.json`);
        console.log(prioridadResponse);
        return prioridadResponse;
    }

    /**
    * DBR - Metodo que (OBTIENE LOS STATUS)
    * @param 
    * @returns
    */
    obtenerStatus(): Observable<any[]> {
        var statusResponse = this.srvHttpClient.get<any[]>(`../../../../../assets/json/catalogos/StatusResponse.json`);
        console.log(statusResponse);
        return statusResponse;
    }

    /**
 * DBR - Metodo que (OBTIENE LOS ESTADOS)
 * @param 
 * @returns
 */
    obtenerEstado(): Observable<any[]> {
        var estadoResponse = this.srvHttpClient.get<any[]>(`../../../../../assets/json/catalogos/EstadoResponse.json`);
        console.log(estadoResponse);
        return estadoResponse;
    }
}