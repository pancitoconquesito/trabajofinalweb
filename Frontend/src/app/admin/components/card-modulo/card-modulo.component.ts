import { Component, Input, OnInit } from '@angular/core';
import { ModuloCurso } from 'src/app/models/modeloCurso.model';

@Component({
  selector: 'app-card-modulo',
  templateUrl: './card-modulo.component.html',
  styleUrls: ['./card-modulo.component.scss']
})
export class CardModuloComponent implements OnInit {

  @Input() modulo:ModuloCurso={
    _id:0,
    img:'',
    numero_modulo:0,
    titulo:'',
    descripcion:'',
    duracion:0,
    urlvideo:'',
    fk_curso:0
  }
  constructor() { }

  ngOnInit(): void {
  }

}
