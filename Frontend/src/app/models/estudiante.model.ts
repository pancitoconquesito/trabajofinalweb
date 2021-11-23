export interface Estudiante{
    _id:number;//pk
    nombres:string;
    apellidos:string;
    email:string;//unique
    contrasena:string;
    pais:string;
    ciudad:string;
    telefono:number;
    cc:string;//unique
    //cv????
    cursosInscritos:Array<CursoInscrito>;// o 
    //notificaciones:numebr tipo id Notificacion
}

export interface CursoInscrito{
    idCurso:number;
    //nivel modulo avanzado??
}