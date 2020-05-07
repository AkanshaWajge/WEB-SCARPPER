import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ExtractorsComponent } from './extractors/extractors.component';
import { SupportComponent } from './support/support.component';
import { EditComponent } from './extractors/edit/edit.component';
//import { EditableTableModule } from '../../node_modules/ng-editable-table/editable-table/editable-table.module';

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
    AppRoutingModule,
   // EditableTableModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
