import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { PokemonService } from '../../service/api/pokemon.service';

@Component({
  selector: 'app-pokemon-modal-form',
  standalone: false,

  templateUrl: './pokemon-modal-form.component.html',
  styleUrl: './pokemon-modal-form.component.css',
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
export class PokemonModalFormComponent {
  @Input() modalOpen: boolean = false;
  @Input() detailPokemon: any = null;
  @Input() evolutionChain: any[] = [];
  @Output() dataModalOpen: EventEmitter<boolean> = new EventEmitter();
  openPhonePrefix: boolean = false;
  submitRes:boolean = false;
  isError:string = "";

  cartForm: FormGroup

  constructor(private formBuilder:FormBuilder,private db:PokemonService) {
    this.cartForm = this.formBuilder.group({
      firstName : ["", Validators.required],
      lastName : ["", Validators.required],
      email : ["", Validators.required],
      phoneCountryCode : ["+62", Validators.required],
      phone : ["", Validators.required],
      buyOption : ["This Evo", Validators.required],
    })
  }

  async submitForm():Promise<void> {

    console.log(this.cartForm.value.buyOption)
    

    let pokemonToBuy = []
    if (this.cartForm.value.buyOption = "All Evo") {
      pokemonToBuy = this.evolutionChain.map(element => {
        return element.currentEvolution.species.name
      });
    } else {
      pokemonToBuy = [this.detailPokemon.name]
    }

    const formData = {
      ...this.cartForm.value,
      pokemonToBuy: pokemonToBuy
    }

    try {
      const res = await this.db.saveFormSubmission(formData)
      this.isError = "Form submission saved successfully!"
      this.modalOpen = false
      this.submitRes = true
    } catch (error) {
      this.modalOpen = false
      this.submitRes = true
      this.isError = "Error Submitted"
    }
  }

  // Method to emit data
  closeModal() {
    const data = !this.modalOpen;
    this.dataModalOpen.emit(data);
  }

  closeAlert() {
    this.submitRes = !this.submitRes;
  }
}
