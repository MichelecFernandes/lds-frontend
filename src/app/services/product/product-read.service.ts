import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Product } from '../../domain/model/product.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductReadService {

  constructor(private http: HttpClient) { }

  //CRUD

  findById(id: string): Promise<Product> {
    return firstValueFrom(this.http.get<Product>(`${environment.api_endpoint}/product/${id}`));
  }

  findByName(name: string): Promise<Product[]> {
    return firstValueFrom(this.http.get<Product[]>(`${environment.api_endpoint}/product?name=${name}`));
  }
  findAll(): Promise<Product[]>{
    return firstValueFrom(this.http.get<Product[]>(`${environment.api_endpoint}/product`));  
  }
  

}
