import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProdutoService {
  constructor(public htttp: HttpClient) {
  }
  findByCategoria(categoria_id: string) {
    return this.htttp.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
  }
}
