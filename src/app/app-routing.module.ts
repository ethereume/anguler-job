import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonplaceholderComponent } from './placeholder/jsonplaceholder/jsonplaceholder.component';
import { UpdateComponent } from './placeholder/update/update.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: JsonplaceholderComponent },
  { path: 'dashboard/update/:id', component:UpdateComponent},
  { path:'**', redirectTo:"" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
