import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-reg-publicador-oferta-laboral',
  templateUrl: './reg-publicador-oferta-laboral.component.html',
  styleUrls: ['./reg-publicador-oferta-laboral.component.scss']
})
export class RegPublicadorOfertaLaboralComponent implements OnInit {

  formulario:FormGroup;
  constructor(private fb:FormBuilder){ 
    this.formulario=this.fb.group({
      nombreEmpresa:['',[Validators.required]],
      email:['',[Validators.email, Validators.required]],
      contrasena:['',[Validators.required]]
    });
  
  }

  ngOnInit(): void {
  }
  validar():void{
    console.log("holo");
  }
}