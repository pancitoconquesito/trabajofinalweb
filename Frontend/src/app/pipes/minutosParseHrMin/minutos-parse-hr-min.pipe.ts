import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutosParseHrMin'
})
export class MinutosParseHrMinPipe implements PipeTransform {

  transform(minutos:number): string {
    return Math.floor(minutos/60)+' Hr '+minutos%60+' min';
  }

}
