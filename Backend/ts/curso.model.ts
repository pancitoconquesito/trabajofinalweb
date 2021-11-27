export interface ModuloCurso{
    _id:number,
    img:string;
    numero_modulo:number;
    titulo:string;
    descripcion:string;
    duracion:number;
    urlvideo:string;//string???
    fk_curso:number;
}
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

//