/** 
* DBR - Componentes propios de Angular
* */
import { Injectable } from '@angular/core';

/** 
* DBR - Componentes propios de Ionic
* */
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})

export class AlertService {
    lblIdInformacion: string = "información";
    constructor(
        public srvAlert: AlertController
    ) { }

    async alertSuccess(message: string) {
        let alert = await this.srvAlert.create({
            header: `${this.lblIdInformacion}`,
            message: `${message}`,
            buttons: [
                {
                    text: 'Ok',
                    handler: () => {
                    }
                }
            ]
        });
        await alert.present();
    }
}