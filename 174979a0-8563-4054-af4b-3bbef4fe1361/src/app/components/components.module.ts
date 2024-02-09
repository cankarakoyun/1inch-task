import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TransactionComponent } from './transaction/transaction.component';
import { FormsModule } from '@angular/forms';
import { OnlyNumberDirective } from '../core/directives/only-number.directive';
import { ModalComponent } from './modal/modal.component';
import { AddressFormatPipe } from '../core/pipes/address-format.pipe';



@NgModule({
  declarations: [
    HeaderComponent, 
    TransactionComponent,
    OnlyNumberDirective,
    ModalComponent,
    AddressFormatPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    HeaderComponent, 
    TransactionComponent,
    ModalComponent,
    AddressFormatPipe
  ], 
  providers: [
    AddressFormatPipe
  ]
})
export class ComponentsModule { }
