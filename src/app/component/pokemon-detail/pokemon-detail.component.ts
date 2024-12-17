import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { PokemonService } from '../../service/api/pokemon.service';
import { ActivatedRoute } from '@angular/router';

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
  id: string = "";
  detailPokemon: any = null;
  species: any = null;
  evolutionChain: any = null;
  modalOpen: boolean = false;

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.fetchPokemon(Number(this.id));
 }

  async fetchPokemon(id: number) {
    this.detailPokemon = await this.pokemonService.getPokemonDetailById(id);
    this.species = await this.pokemonService.getPokemonDetail(this.detailPokemon.species.url);
    const chainData = await this.pokemonService.getPokemonDetail(this.species.evolution_chain.url);
    this.evolutionChain = this.parseEvolutionChain(chainData);
    console.log(this.evolutionChain)
  }

  parseEvolutionChain(evolutions: any) {
    const evolutionChain = [];
    let currentEvolution = evolutions.chain;
    
    while (currentEvolution) {
      const image = this.getImage(currentEvolution.species.name);
      evolutionChain.push({currentEvolution, image: image});
      currentEvolution = currentEvolution.evolves_to[0];
    }

    return evolutionChain;
  }

  async getImage(name: string) {
    const data = await this.pokemonService.getPokemonDetailByName(name);
    console.log(data.sprites.front_default)
    return await data.sprites.front_default;
  }

  buyCard() {
    this.modalOpen = true
  }

  closeModal(isOpen: boolean) {
    this.modalOpen = isOpen
  }
}
