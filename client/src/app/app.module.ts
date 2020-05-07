import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ExtractorsComponent } from './extractors/extractors.component';
import { SupportComponent } from './support/support.component';
import { EditComponent } from './extractors/edit/edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { WebpageComponent } from './extractors/edit/webpage/webpage.component';
import { ListComponent } from './extractors/list/list.component';
import { AddExtractorComponent } from './extractors/add-extractor/add-extractor.component';
import { DetailsComponent } from './extractors/details/details.component';
import { EditorComponent } from './extractors/edit/editor/editor.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExtractorsComponent,
    SupportComponent,
    EditComponent,
    WebpageComponent,
    ListComponent,
    AddExtractorComponent,
    DetailsComponent,
    EditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
