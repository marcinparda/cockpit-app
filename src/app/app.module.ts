import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ApiButtonComponent } from './components/api-button/api-button.component';

@NgModule({
  imports: [BrowserModule, ApiButtonComponent, AppComponent],
  providers: [],
})
export class AppModule {}
