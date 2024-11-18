import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';
import { Product } from '../../domain/model/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductUpdateService {

  //Sobre APIs
  //GET: obtem valores de algum endpoint
  //Post: envia valores para algum endpoint(geralmente para criar algo)
  //Put: envia valores para algum endpoint(geralmente para atualizar)
  //Delete: envia um determinado parametro de forma que o item seja removido
  //Patch? envia valores para algum endpoint(tambem para atualizar, porem parte do objeto


  constructor(private http: HttpClient) { }

  async update(product: Product) {
    console.log(`atualizando o produto...`);
    console.log(product);
    return await firstValueFrom(this.http.put(`${environment.api_endpoint}/product/${product.id}`, product));

  }
}
