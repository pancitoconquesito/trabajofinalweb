import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cantModulosCurso'
})
export class CantModulosCursoPipe implements PipeTransform {

  transform(cantidad: number): string {
    let cadena='';
    if(cantidad > 1)return cantidad+' Módulos';
    return cantidad+' Módulo';
  }

}
