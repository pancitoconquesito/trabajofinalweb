import { Time } from "@angular/common";
import { ModuloCurso } from "./modeloCurso.model";

export interface Curso{
    id:number;
    img:string;
    titulo:string;
    cantModulos:number;
    duracion:number;//en minutos, o time?
    tematica:string;
    descripcionGeneral:string;
    modulos:Array<ModuloCurso>;
}




