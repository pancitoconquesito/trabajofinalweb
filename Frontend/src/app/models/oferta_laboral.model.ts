export interface OfertaLaboral{
    _id:number,
    titulo:string;
    descripcion:string;
    pais:string;
    ciudad:string;
    fecha_publicacion:string;
    tipo_jornada:string;// si hay tiempo promover a number, TODO
    correo_contacto_reclutar:string;
    telefono_contacto_laboral:number;
    fk_idEmpresa:number;
    teletrabajo:boolean;
    salario:number;
}
// {_id:0,titulo:'',descripcion:'',pais:'',ciudad:'',fecha_publicacion:'',tipo_jornada:'',correo_contacto_reclutar:'',telefono_contacto_laboral:0,fk_idEmpresa:0,teletrabajo:false,salario:0}