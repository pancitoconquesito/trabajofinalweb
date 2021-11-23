import { Component } from '@angular/core';
import { Curso } from './models/curso.model';
import { CursoService } from './services/curso/curso.service';
import { EstudianteService } from './services/estudiante/estudiante.service';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  test:Array<any>=[];
  VISITANTE_0=0;
  estado=this.VISITANTE_0;
  constructor(private s_login:LoginService, private s_curso:CursoService){
  }
  ngOnInit(){
    // this.s_login.isEmailDisponible('juan@gmail.com').subscribe(datos=>{
    //   console.log(datos.valor);
    //   if(datos.valor==true) console.log("ok");else console.log("nook");
    // });
    




  }
}
