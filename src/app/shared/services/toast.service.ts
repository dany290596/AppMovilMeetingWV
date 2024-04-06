/** 
* DBR - Componentes propios de Angular
* */
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})

export class ToastService {

    constructor(
        private toastController: ToastController
    ) { }

    /** 
* DBR - Metodo propio de Ionic que permite mostrar el control (ToastController) de PRIMARY
* */
    async primaryToast(message: string) {
        const TOAST = await this.toastController.create({
            message,
            duration: 4000,
            color: 'primary',
            position: 'bottom',
            buttons: [{
                text: 'Cerrar',
                role: 'cancel'
            }]
        });
        TOAST.present();
    }

    /** 
* DBR - Metodo propio de Ionic que permite mostrar el control (ToastController) de DANGER
* */
    async dangerToast(message: string) {
        const TOAST = await this.toastController.create({
            message,
            duration: 4000,
            color: 'danger',
            position: 'bottom',
            buttons: [{
                text: 'Cerrar',
                role: 'cancel'
            }]
        });
        TOAST.present();
    }

    /** 
  * DBR - Metodo propio de Ionic que permite mostrar el control (ToastController) de DARK
  * */
    async darkToast(message: string) {
        const TOAST = await this.toastController.create({
            message,
            duration: 4000,
            color: 'dark',
            position: 'bottom',
            buttons: [{
                text: 'Cerrar',
                role: 'cancel'
            }]
        });
        TOAST.present();
    }

    /** 
  * DBR - DBR - Metodo propio de Ionic que permite mostrar el control (ToastController) de WARNING
  * */
    async warningToast(message: string) {
        const TOAST = await this.toastController.create({
            message,
            duration: 4000,
            color: 'warning',
            position: 'bottom',
            buttons: [{
                text: 'Cerrar',
                role: 'cancel'
            }]
        });
        TOAST.present();
    }

    /** 
 * DBR - DBR - Metodo propio de Ionic que permite mostrar el control (ToastController) de CORRECTO
 * */
    async successToast(message: string) {
        const TOAST = await this.toastController.create({
            message,
            duration: 4000,
            color: 'success',
            position: 'bottom',
            buttons: [{
                text: 'Cerrar',
                role: 'cancel'
            }]
        });
        TOAST.present();
    }
}