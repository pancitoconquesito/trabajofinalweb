import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CuentaEmpresa } from 'src/app/models/cuenta_empresa.model';
import { dv_CardOferta } from 'src/app/models/dv_card_oferta.model';
import { OfertaLaboral } from 'src/app/models/oferta_laboral.model';
import { OfertaService } from 'src/app/services/oferta/oferta.service';

@Component({
  selector: 'app-card-oferta',
  templateUrl: './card-oferta.component.html',
  styleUrls: ['./card-oferta.component.scss']
})
export class CardOfertaComponent implements OnInit {

  @Input() oferta:OfertaLaboral={_id:0,titulo:'',descripcion:'',pais:'',ciudad:'',fecha_publicacion:'',tipo_jornada:'',correo_contacto_reclutar:'',telefono_contacto_laboral:0,fk_idEmpresa:0,teletrabajo:false,salario:0};
  empresa:CuentaEmpresa={_id:0,nombreEmpresa:'',correo:'',password:'',telefono:0,descripcionEmpresa:'',imgEmpresa:'',ofertasPublicadas:[]
}
  numeroNub:number=0;
  constructor(private router:Router, private s_empresa:OfertaService) {
  }
  
  ngOnInit(): void {
    // console.log("cardcard__FK"+this.oferta.fk_idEmpresa+"___ID"+this.oferta._id);

    this.s_empresa.getInfoEmpresa(this.oferta.fk_idEmpresa).subscribe(datos=>{
      this.empresa=datos;
    });
    this.s_empresa.getNub(this.oferta.fk_idEmpresa, this.oferta._id).subscribe(dato=>{
      this.numeroNub=dato._idnub;
    });
    // console.log("card"+JSON.stringify(this.oferta));
    // console.log("ahhhh___"+this.oferta+"____"+this.idEmpresa);
  }
  // enter_oferta(nombreEmpresa:string, idNubOfertaEmpresa:number):void{
  //   this.router.navigate(['/inicioEstudiante/:id/ofertas/'+nombreEmpresa+'/'+idNubOfertaEmpresa]);
  // }
  irAOferta(){
    window.scroll(0,0);
    this.router.navigate(['/inicioEstudiante/ofertas/'+this.empresa.nombreEmpresa+'/'+this.numeroNub]);
  }
}
