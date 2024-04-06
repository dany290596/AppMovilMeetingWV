/** 
* DBR - Componentes propios de Angular
* */
import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

/** 
* DBR - Interfaces
* */
import { CommonResponse } from "src/app/shared/interfaces/http.interface";
import { StorageResponse } from 'src/app/shared/interfaces/storage.interface';

/** 
* DBR - Capacitor
* */
import { Preferences } from '@capacitor/preferences';

/** 
* DBR - Componentes propios de Ionic
* */
import { NavController } from '@ionic/angular';
import { MenuController, AlertController } from '@ionic/angular';

/** 
* DBR - Servicios
* */
import { ToastService } from 'src/app/shared/services/toast.service';

@Injectable({
    providedIn: 'root'
})

export class StorageService {
    constructor(
        private srvMenu: MenuController,
        private srvNav: NavController,
        private srvToast: ToastService
    ) { }

    async crear(key: string, value: any) {
        await Preferences.set({ key, value });
    }

    async obtenerPorKey(key: string) {
        return (await Preferences.get({ key }));
    }

    async actualizar(key: string, value: any) {
        await Preferences.set({ key, value });
    }

    async eliminarPorKey(key: string) {
        await Preferences.remove({ key });
    }

    async eliminar() {
        await Preferences.clear();
    }

    async cerrarSesion() {
        //this.eliminarPorKey("urlapi");
        this.eliminarPorKey("token");
        this.eliminarPorKey("detailuser");
        this.srvMenu.enable(false);
        this.srvNav.navigateRoot('/auth/pages/login');
    }
}