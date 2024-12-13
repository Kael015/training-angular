import { Component, Input } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-pokemon-detail',
  standalone: false,
  
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css',
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
export class PokemonDetailComponent {
  @Input() pokemon: any = null;
  @Input() isDisabled: boolean = true;

}
