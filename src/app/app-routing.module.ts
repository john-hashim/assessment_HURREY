import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchComponent } from './batch/batch.component';
import { InstitutionComponent } from './institution/institution.component';


const routes: Routes = [
  {path:'batch',component:BatchComponent},
  {path:'institution',component:InstitutionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
