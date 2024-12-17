import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileModule } from './page/profile/profile.module';
import { PokemonComponent } from './component/pokemon/pokemon.component';
import { PokemonDetailComponent } from './component/pokemon-detail/pokemon-detail.component';
import { PokemonCardComponent } from './component/pokemon-card/pokemon-card.component';
import { PokemonModalComponent } from './component/pokemon-modal/pokemon-modal.component';
import { PokemonModalFormComponent } from './component/pokemon-modal-form/pokemon-modal-form.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    PokemonDetailComponent,
    PokemonCardComponent,
    PokemonModalComponent,
    PokemonModalFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProfileModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
