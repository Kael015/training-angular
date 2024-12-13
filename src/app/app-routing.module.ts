import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentComponent } from './page/profile/component/component.component';
import { PokemonComponent } from './component/pokemon/pokemon.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ComponentComponent
  },
  {
    path: 'pokemon',
    component: PokemonComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }