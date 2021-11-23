import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent implements OnInit {

  opcion=0;
  ESTUDIANTE=1;
  PUBLICADOR_TRABAJO=2;

  @Output() volver_event= new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  changeSeleccion(valor:number){
    this.opcion=valor;
  }
  volver():void{
    this.volver_event.emit(0);
  }
}
