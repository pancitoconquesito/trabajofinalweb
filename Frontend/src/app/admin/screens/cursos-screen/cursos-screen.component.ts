import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/models/curso.model';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-cursos-screen',
  templateUrl: './cursos-screen.component.html',
  styleUrls: ['./cursos-screen.component.scss']
})
export class CursosScreenComponent implements OnInit {

  listaCursos:Array<Curso>=[];
  constructor(private s_admin:AdminService, private rutaActiva:ActivatedRoute) { 
 
  }

  ngOnInit(): void {
    this.s_admin.getallcursos().subscribe(dato=>{
      for( let i of dato){
        this.listaCursos.push(i);
      }
    });
  }


}
