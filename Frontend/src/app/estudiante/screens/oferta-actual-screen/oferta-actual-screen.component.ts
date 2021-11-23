import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuentaEmpresa } from 'src/app/models/cuenta_empresa.model';
import { OfertaService } from 'src/app/services/oferta/oferta.service';

@Component({
  selector: 'app-oferta-actual-screen',
  templateUrl: './oferta-actual-screen.component.html',
  styleUrls: ['./oferta-actual-screen.component.scss']
})
export class OfertaActualScreenComponent implements OnInit {

  nombre:string='';
  idNubOfertaEmpresa:number=0
  dataEmpresaOferta:CuentaEmpresa;
  constructor(private ruta:ActivatedRoute, private serviceOferta:OfertaService) { 
    this.ruta.params.subscribe( param=>{
      this.nombre=param['nombre'];
      this.idNubOfertaEmpresa=param['idNUBOfertaEmpresa'];
    });
    this.dataEmpresaOferta=this.serviceOferta.getActualInfoOferta(this.idNubOfertaEmpresa);
    // serviceOferta.
    console.log(this.dataEmpresaOferta);
    
  }

  ngOnInit(): void {
  }

}
