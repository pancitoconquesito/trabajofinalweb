import { Pipe, PipeTransform } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
// import { FiltroCurso } from 'src/app/models/filtroCurso.model';

@Pipe({
  name: 'filtroCursos'
})
export class FiltroCursosPipe implements PipeTransform {

  transform(listaCursos:Array<Curso>,mod1:boolean, mod2:boolean, mod3:boolean, mod4:boolean, modMas:boolean, temaProg:boolean, temaDiseno:boolean, temaHumanidades:boolean, textFiltro:string): Array<Curso> {
    
    let listaCursosRetorno:Array<Curso>=[];
    //filtro texto
    if(textFiltro.length>0){
      for(let curso of listaCursos)
        if(curso.titulo.toUpperCase().indexOf(textFiltro.toUpperCase()) > -1) listaCursosRetorno.push(curso);
    }else 
      listaCursosRetorno=listaCursos.slice();

    //modulos
    let checkMod:boolean=(mod1&&mod2&&mod3&&mod4&&modMas)||(!mod1&&!mod2&&!mod3&&!mod4&&!modMas);
    if(!checkMod){
        // listaCursosRetorno.pop();
        if(!mod1)listaCursosRetorno=listaCursosRetorno.filter( x => x.cant_modulos != 1);
        if(!mod2)listaCursosRetorno=listaCursosRetorno.filter( x => x.cant_modulos != 2);
        if(!mod3)listaCursosRetorno=listaCursosRetorno.filter( x => x.cant_modulos != 3);
        if(!mod4)listaCursosRetorno=listaCursosRetorno.filter( x => x.cant_modulos != 4);
        if(!modMas)listaCursosRetorno=listaCursosRetorno.filter( x => x.cant_modulos < 5);
    }
    
    //tema
    let checkTema:boolean=(temaProg&&temaDiseno&&temaHumanidades)||(!temaProg&&!temaDiseno&&!temaHumanidades);
    if(!checkTema){
        // listaCursosRetorno.pop();
        if(!temaProg)listaCursosRetorno=listaCursosRetorno.filter( x => x.tematica!== 'Programación');
        if(!temaDiseno)listaCursosRetorno=listaCursosRetorno.filter( x => x.tematica !=='Diseño');
        if(!temaHumanidades)listaCursosRetorno=listaCursosRetorno.filter( x => x.tematica != 'Humanidades');
    }
    return listaCursosRetorno;
  }

}
