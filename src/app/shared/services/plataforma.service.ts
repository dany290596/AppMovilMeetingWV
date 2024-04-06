/** 
* DBR - Componentes propios de Angular
* */
import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PlataformaService {
    constructor() { }

    dividirHora(hora: string): string {
        let operacion = hora.split(':');
        let union: string = operacion[0] + ":" + operacion[1] + ":" + "00";
        return union;
    }

    ajustarHora(hora: string): string {
        let operacion = hora.split(':');
        let union: string = operacion[0] + ":" + operacion[1];
        return union;
    }

    dividirFecha(fecha: string): string {
        let operacion = fecha.split('T');
        let union: string = operacion[1];
        return union;
    }
}