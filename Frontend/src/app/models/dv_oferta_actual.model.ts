import { CuentaEmpresa } from "./cuenta_empresa.model";

export interface dv_OfertaActual{
    // dataEmpresa:{
    //     nombre_empresa:string;
    //     descripcion_empresa:string;
    //     img:string;
    //     telefono_contacto_laboral:number;
    //     correo_contacto_laboral:string;
    // },
    // dataOferta:{
    //     titulo:string;
    //     descripcion_trabajo:string;
    //     pais:string;
    //     ciudad:string;
    //     fecha:string;
    // }
    dataEmpresa:CuentaEmpresa;
}