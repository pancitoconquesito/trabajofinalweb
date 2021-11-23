import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';

const COMPONENTES=[
  FooterComponent
]

@NgModule({
  declarations: [
    ...COMPONENTES
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ...COMPONENTES
  ]
})
export class SharedModule { }
