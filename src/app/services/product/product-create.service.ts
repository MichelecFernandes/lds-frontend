import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Product } from '../../domain/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductCreateService {

  constructor(private http: HttpClient) { }

  async create(product: Product){
    return firstValueFrom(this.http.post('http://localhost:3000/product', product));
  }
}
