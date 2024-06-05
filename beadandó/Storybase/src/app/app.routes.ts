import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListElementsComponent } from './list-elements/list-elements.component';
import { EditElementComponent } from './edit-element/edit-element.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: ':category', component: ListElementsComponent},
    {path: ':category/:id', component: EditElementComponent}
    // {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }