import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SupportComponent } from './support/support.component';
import { ExtractorsComponent } from './extractors/extractors.component';
import { AppComponent } from './app.component';
import { EditComponent } from './extractors/edit/edit.component';


const routes: Routes = [
  { path: '', component: ExtractorsComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'extractors', component: ExtractorsComponent,
    children: [
      { path: 'edit/:id', component: EditComponent }
    ]
  },
  { path: 'support', component: SupportComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
