import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Product } from '../../domain/model/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductCreateService {

  constructor(private http: HttpClient) { }

  async create(product: Product){
    return firstValueFrom(this.http.post(`${environment.api_endpoint}/product`, product));
  }
}
