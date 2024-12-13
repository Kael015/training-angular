import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SateliteService {

  constructor() { }

  static satellite = axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
