import { Injectable } from '@angular/core';
import { SateliteService } from '../satelite/satelite.service';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private api = 'https://pokeapi.co/api/v2/pokemon/';
  private databaseUrl = `${environment.firebaseDatabaseUrl}/formSubmissions`;

  constructor(private http: HttpClient) {}

  async getPokemon(limit: number = 20) {
    const response = await SateliteService.satellite.get(this.api, {
      params: {
        limit,
      },
    });
    return response.data.results;
  }

  async getPokemonDetail(url: string) {
    const response = await SateliteService.satellite.get(url);
    return response.data;
  }

  async getPokemonDetailById(id: number) {
    const response = await SateliteService.satellite.get(this.api + `/${id}`);
    return response.data;
  }

  async getPokemonDetailByName(name: string) {
    const response = await SateliteService.satellite.get(this.api + `/${name}`);
    return response.data;
  }

  async saveFormSubmission(data: any): Promise<void> {
    try {
      await firstValueFrom(this.http.post(`${this.databaseUrl}.json`, data));
      console.log('Form submission saved successfully!');
    } catch (error) {
      console.error('Error saving form submission:', error);
      throw error;
    }
  }

  async getFormSubmissions(): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.get(`${this.databaseUrl}.json`)
      );
      return response || {};
    } catch (error) {
      console.error('Error fetching form submissions:', error);
      throw error;
    }
  }

  async getFormSubmission(id: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.get(`${this.databaseUrl}/${id}.json`)
      );
      return response;
    } catch (error) {
      console.error('Error fetching form submission:', error);
      throw error;
    }
  }

  async updateFormSubmission(id: string, data: any): Promise<void> {
    try {
      await firstValueFrom(
        this.http.put(`${this.databaseUrl}/${id}.json`, data)
      );
      console.log('Form submission updated successfully!');
    } catch (error) {
      console.error('Error updating form submission:', error);
      throw error;
    }
  }

  async deleteFormSubmission(id: string): Promise<void> {
    try {
      await firstValueFrom(this.http.delete(`${this.databaseUrl}/${id}.json`));
      console.log('Form submission deleted successfully!');
    } catch (error) {
      console.error('Error deleting form submission:', error);
      throw error;
    }
  }
}
