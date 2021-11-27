import { Time } from "@angular/common";
import { ModuloCurso } from "./modeloCurso.model";

export interface Curso{
    _id:number;
    img:string;
    titulo:string;
    cant_modulos:number;
    duracion:number;//en minutos, o time?
    tematica:string;
    descripcion_general:string;
    modulos:Array<ModuloCurso>;
}




