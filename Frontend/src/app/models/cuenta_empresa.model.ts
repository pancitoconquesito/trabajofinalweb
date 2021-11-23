import {OfertaLaboral} from './oferta_laboral.model';
export interface CuentaEmpresa{
    _id:number;
    nombreEmpresa:string;//unique
    correo:string;//unique
    password:string;
    telefono:number;
    descripcionEmpresa:string;
    imgEmpresa:string;//img??
    ofertasPublicadas:Array<OfertaLaboral>;
}