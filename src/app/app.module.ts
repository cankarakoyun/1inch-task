import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from "ngx-ui-loader";

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ComponentsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
