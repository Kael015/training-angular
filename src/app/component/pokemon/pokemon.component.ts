import { Component } from '@angular/core';
import { PokemonService } from '../../service/api/pokemon.service';

@Component({
  selector: 'app-pokemon',
  standalone: false,
  
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent {
  pokemonList: any[] = [];
  filteredPokemonList: any[] = [];
  paginationPokemonList: any[] = [];
  selectedPokemon: any[] = [];
  theme: 'light' | 'dark' = 'light';
  filter: string = '';
  selectedElement: string = '';
  elements: string[] = ["fire", "water", "grass", "bug", "normal"];
  currentPage: number = 1;
  itemPerPage: number = 10;
  totalPage: number = 0;

  constructor(private pokemonService: PokemonService) { }

  async fetchPokemon() {
    const response = await this.pokemonService.getPokemon(100);
    this.pokemonList = await Promise.all(
      response.map(async (pokemon: any) => {
        const pokemonDetail = await this.pokemonService.getPokemonDetail(pokemon.url);
        return {
          name: pokemon.name,
          url: pokemon.url,
          image: pokemonDetail.sprites.front_default,
          element: pokemonDetail.types
        }
      })
    )
    this.filteredPokemonList = this.pokemonList;
    this.updatePagination();
  }

  async ngOnInit() {
    await this.fetchPokemon();
  }

  applyFilter() {
    this.filteredPokemonList = this.pokemonList.filter((pokemon) => {
      const matchName = pokemon.name.toLowerCase().includes(this.filter.toLowerCase());
      const matchElement = pokemon.element.some((element: any) => element.type.name === this.selectedElement);
      return matchName && matchElement;
    });
  }

  updatePagination() {
    this.totalPage = Math.ceil(this.filteredPokemonList.length / this.itemPerPage);
    this.paginationPokemonList = this.filteredPokemonList.slice((this.currentPage - 1) * this.itemPerPage, this.currentPage * this.itemPerPage);
  }

  paginate() {
    const startIndex = (this.currentPage - 1) * this.itemPerPage;
    const endIndex = startIndex + this.itemPerPage;
    this.paginationPokemonList = this.filteredPokemonList.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPage) {
      this.currentPage++;
      this.paginate();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  async selectPokemon(url: string) {
    this.selectedPokemon = await this.pokemonService.getPokemonDetail(url);
    console.log(this.selectedPokemon)
  }
}
