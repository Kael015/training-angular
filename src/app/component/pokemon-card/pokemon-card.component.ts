import { Component, Input } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  standalone: false,
  
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      transition('void <=> *', [animate('0.5s ease-in-out')]),
    ]),
  ],
})
export class PokemonCardComponent {
  @Input() pokemon: any = null;
  @Input() selectedPokemon: any = null;
  
  constructor(private router: Router) {}

  showDetail(pokemon: any) {
    console.log(pokemon)
    this.router.navigate(['/pokemon-detail', pokemon]);
  }

}
