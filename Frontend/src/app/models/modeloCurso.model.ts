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