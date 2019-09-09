import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FileSelectDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { AppService } from './app.service';

@NgModule({
  declarations: [AppComponent, FileSelectDirective],
  imports: [BrowserModule, HttpClientModule],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {}
