import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuentaEmpresa } from 'src/app/models/cuenta_empresa.model';
import { OfertaLaboral } from 'src/app/models/oferta_laboral.model';
import { OfertaService } from 'src/app/services/oferta/oferta.service';

@Component({
  selector: 'app-oferta-actual-screen',
  templateUrl: './oferta-actual-screen.component.html',
  styleUrls: ['./oferta-actual-screen.component.scss']
})
export class OfertaActualScreenComponent implements OnInit {

  nombre:string='';
  idNubOfertaEmpresa:number=1
  dataEmpresaOferta:CuentaEmpresa={ _id:0, nombreEmpresa: '', correo:'', password:'', telefono:0, descripcionEmpresa:'', imgEmpresa:'', ofertasPublicadas:[]};
  oferta:OfertaLaboral={_id:0,titulo:'',descripcion:'',pais:'',ciudad:'',fecha_publicacion:'',tipo_jornada:'',correo_contacto_reclutar:'',telefono_contacto_laboral:0,fk_idEmpresa:0,teletrabajo:false,salario:0};
  constructor(private ruta:ActivatedRoute, private serviceOferta:OfertaService) { 
    this.ruta.params.subscribe( param=>{
      this.nombre=param['nombre'];
      this.idNubOfertaEmpresa=param['idNUBOfertaEmpresa'];
      // console.log("------"+this.idNubOfertaEmpresa);
    });
    this.serviceOferta.getInfoOferta(this.idNubOfertaEmpresa).subscribe(dato=>{
      this.dataEmpresaOferta=dato;
      this.oferta=this.dataEmpresaOferta.ofertasPublicadas[0];
      // console.log(this.oferta);
    });
    
  }

  ngOnInit(): void {
  }

}
