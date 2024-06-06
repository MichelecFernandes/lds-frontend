import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Products } from '../../views/app/product/product-list/product-list.component';

@Injectable({
  providedIn: 'root'
})
export class ProductCreateService {

  constructor(private http: HttpClient) { }

  async create(product: Products){
    return firstValueFrom(this.http.post('http://localhost:3000/product', product));
  }
}
