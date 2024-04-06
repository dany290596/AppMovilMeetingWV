export interface CommonResponse {
    error: any;
    codigo: number;
    mensaje: string;
    meta: any;
    data: any;
    respuesta: boolean;
}

export interface GmailUser {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
}

export interface IRespuesta {
    respuesta: boolean,
    mensaje: string,
    codigo?: number,
    objeto?: any
}