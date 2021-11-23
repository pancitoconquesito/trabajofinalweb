import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { dv_CardOferta } from 'src/app/models/dv_card_oferta.model';

@Component({
  selector: 'app-card-oferta',
  templateUrl: './card-oferta.component.html',
  styleUrls: ['./card-oferta.component.scss']
})
export class CardOfertaComponent implements OnInit {

  @Input() lista_dv_cardOferta:dv_CardOferta;
  @Input() idEmpresa:number=0;

  constructor(private router:Router) {
    this.lista_dv_cardOferta={
      _id_nubOfertaEmpresa:0,
      titulo:'',
      nombreEmpresa:'',
      pais:'',
      ciudad:'',
      fechaPublicacion:'',
      imgEmpresa:''
    };
   }

  ngOnInit(): void {
    console.log("ahhhh___"+this.lista_dv_cardOferta+"____"+this.idEmpresa);
  }
  // enter_oferta(nombreEmpresa:string, idNubOfertaEmpresa:number):void{
  //   this.router.navigate(['/inicioEstudiante/:id/ofertas/'+nombreEmpresa+'/'+idNubOfertaEmpresa]);
  // }
}
