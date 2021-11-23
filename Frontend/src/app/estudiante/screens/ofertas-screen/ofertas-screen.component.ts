import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dv_CardOferta } from 'src/app/models/dv_card_oferta.model';
import { nub_OfertaEmpresa } from 'src/app/models/nub_oferta_empresa_model';

// servicios
import { OfertaService} from '../../../services/oferta/oferta.service';
@Component({
  selector: 'app-ofertas-screen',
  templateUrl: './ofertas-screen.component.html',
  styleUrls: ['./ofertas-screen.component.scss']
})
export class OfertasScreenComponent implements OnInit {

  inicioListaOfertas:number;
  finalListaOfertas:number;

  listaNub_OfertasEmpresa:Array<nub_OfertaEmpresa>=[];
  lista_dv_cardOferta:Array<dv_CardOferta>=[];

  constructor(private router:Router, private servicio_Oferta:OfertaService){
    this.inicioListaOfertas=0;
    this.finalListaOfertas=4;
  }
  ngOnInit(): void {
    
    this.servicio_Oferta.get_ARRAY_DvOferta_ARRAYnubOfertaEmpresa().subscribe(datos=>{
      // console.log(datos);
      this.lista_dv_cardOferta=datos;
    });

  }


  
}
