import { Component, Input, OnInit } from '@angular/core';
import { ModuloCurso } from 'src/app/models/modeloCurso.model';

@Component({
  selector: 'app-card-modulo-descripcion',
  templateUrl: './card-modulo-descripcion.component.html',
  styleUrls: ['./card-modulo-descripcion.component.scss']
})
export class CardModuloDescripcionComponent implements OnInit {

  @Input() modulo:ModuloCurso={_id:0,img:'', numero_modulo:0, titulo:'',descripcion:'',duracion:0,urlvideo:'',fk_curso:0};
  constructor() { }

  ngOnInit(): void {
  }

}
