import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-modal',
  standalone: false,
  
  templateUrl: './pokemon-modal.component.html',
  styleUrl: './pokemon-modal.component.css',
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
export class PokemonModalComponent {
  @Input() pokemon: any = null;
  @Input() selectedPokemon: any = null;
  @Input() modalOpen: boolean = false;
  @Output() dataModalOpen: EventEmitter<boolean> = new EventEmitter();

  // Method to emit data
  closeModal() {
    const data = !this.modalOpen;
    this.dataModalOpen.emit(data);
  }
  
  constructor(private router: Router) {}

  showDetail(pokemon: any) {
    console.log(pokemon)
    this.router.navigate(['/pokemon-detail', pokemon]);
  }

  // closeModal() {
  //   this.modalOpen = !this.modalOpen
  // }

}
