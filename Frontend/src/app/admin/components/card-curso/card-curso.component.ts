import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/models/curso.model';

@Component({
  selector: 'app-card-curso',
  templateUrl: './card-curso.component.html',
  styleUrls: ['./card-curso.component.scss']
})
export class CardCursoComponent implements OnInit {

  @Input() curso:Curso={ _id:0, img:'', titulo:'', cant_modulos:0, duracion:0, tematica:'', descripcion_general:'', modulos:[]};
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  verCurso(){
    this.router.navigate(['/admin/curso-actual/'+this.curso._id]);
  }
}
