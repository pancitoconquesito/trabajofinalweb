import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { OfertaLaboral } from 'src/app/models/oferta_laboral.model';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';

@Component({
  selector: 'app-inicio-screen',
  templateUrl: './inicio-screen.component.html',
  styleUrls: ['./inicio-screen.component.scss']
})
export class InicioScreenComponent implements OnInit {

  lista:Array<OfertaLaboral>=[];
  constructor(private empresaS:EmpresaService) { }

  ngOnInit(): void {
    this.empresaS.getOfertasEmpresa(Number(this.empresaS.getLS_empresa())).subscribe(datos=>{
      this.lista=datos;
      console.log(this.lista);
    });
  }

}
