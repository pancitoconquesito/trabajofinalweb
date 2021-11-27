import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dv_CardOferta } from 'src/app/models/dv_card_oferta.model';
import { nub_OfertaEmpresa } from 'src/app/models/nub_oferta_empresa_model';
import { OfertaLaboral } from 'src/app/models/oferta_laboral.model';
import { EstudianteService } from 'src/app/services/estudiante/estudiante.service';
// import { runInThisContext } from 'vm';
import {FiltroOfertaPipe} from '../../../pipes/filtro-oferta/filtro-oferta.pipe';
// servicios
import { OfertaService} from '../../../services/oferta/oferta.service';
@Component({
  selector: 'app-ofertas-screen',
  templateUrl: './ofertas-screen.component.html',
  styleUrls: ['./ofertas-screen.component.scss']
})
export class OfertasScreenComponent implements OnInit {

  filtro_texto:string='';
  filtro_nacional:boolean=false;
  filtro_internacional:boolean=false;
  filtro_teletrabajo:boolean=false;
  filtro_completo:boolean=false;
  filtro_parcial:boolean=false;
  filtro_horas:boolean=false;
  input_nacional:any;
  // input_internacional:any;
  input_teletrabajo:any;
  input_completo:any;
  input_parcial:any;
  input_horas:any;
  inicioListaOfertas:number;
  finalListaOfertas:number;
  nacionalidad:string='';

  listaNub_OfertasEmpresa:Array<nub_OfertaEmpresa>=[];
  lista_dv_cardOferta:Array<OfertaLaboral>=[];

  constructor(private router:Router, private servicio_Oferta:OfertaService, private s_estudiante:EstudianteService){
    this.inicioListaOfertas=0;
    this.finalListaOfertas=4;
  }
  ngOnInit(): void {
    
    this.servicio_Oferta.get_ARRAY_DvOferta_ARRAYnubOfertaEmpresa().subscribe(datos=>{
      this.lista_dv_cardOferta=datos;
      console.log(datos);
    });
    this.s_estudiante.getPais(Number(this.s_estudiante.getLS_loginEstudiante())).subscribe(dato=>{
      this.nacionalidad=dato.pais;
    });
    this.input_nacional =document.getElementById("nacional");
    // this.input_internacional =document.getElementById("internacional");
    this.input_teletrabajo =document.getElementById("teletrabajo");
    this.input_completo =document.getElementById("completo");
    this.input_parcial =document.getElementById("parcial");
    this.input_horas =document.getElementById("horas");
  }

  updateFiltro(){
    this.filtro_nacional=this.input_nacional.checked;
    // this.filtro_internacional=this.input_internacional.checked;
    this.filtro_teletrabajo=this.input_teletrabajo.checked;
    this.filtro_completo=this.input_completo.checked;
    this.filtro_parcial=this.input_parcial.checked;
    this.filtro_horas=this.input_horas.checked;
  }


  
}
