import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from '@angular/router';


@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss']
})
export class EstudianteComponent implements OnInit {

  idEstudiante:any=99;
  constructor(private rutaparam:ActivatedRoute) { 
    // this.rutaparam.params.subscribe(param=>{
    //   console.log(param);
    // });
  
  }

  ngOnInit(): void {
    
  }

}
