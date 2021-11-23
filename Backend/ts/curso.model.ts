export interface ModuloCurso{
    img:string;
    numeroModulo:number;
    titulo:string;
    descripcion:string;
    duracion:number;
    urlVideo:string;//string???
}
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

//