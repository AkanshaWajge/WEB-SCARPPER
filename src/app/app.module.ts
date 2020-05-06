import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ExtractorsComponent } from './extractors/extractors.component';
import { SupportComponent } from './support/support.component';
import { EditComponent } from './extractors/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExtractorsComponent,
    SupportComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
