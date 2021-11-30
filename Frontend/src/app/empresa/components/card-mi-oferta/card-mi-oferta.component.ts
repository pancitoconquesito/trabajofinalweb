import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfertaLaboral } from 'src/app/models/oferta_laboral.model';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';

@Component({
  selector: 'app-card-mi-oferta',
  templateUrl: './card-mi-oferta.component.html',
  styleUrls: ['./card-mi-oferta.component.scss']
})
export class CardMiOfertaComponent implements OnInit {

  @Input() oferta:OfertaLaboral= {_id:0,titulo:'',descripcion:'',pais:'',ciudad:'',fecha_publicacion:'',tipo_jornada:'',correo_contacto_reclutar:'',telefono_contacto_laboral:0,fk_idEmpresa:0,teletrabajo:false,salario:0};
  constructor(private empresaS:EmpresaService, private router:Router) { }

  ngOnInit(): void {
  }
  eliminar(){
    this.empresaS.eliminarOfertaEmpresa(this.oferta._id).subscribe(datos=>{
      alert("oferta Eliminada");
      this.router.navigate(['/empresa/crearoferta']);
    });
  }
}
