import { Injectable } from '@angular/core';
import { SateliteService } from '../satelite/satelite.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private api = 'https://pokeapi.co/api/v2/pokemon/';

  constructor() { }

  async getPokemon(limit: number = 20) {
    const response = await SateliteService.satellite.get(this.api, {
      params: {
        limit
      }
    });
    return response.data.results;
  }

  async getPokemonDetail(url: string) {
    const response = await SateliteService.satellite.get(url);
    return response.data;
  }
}
