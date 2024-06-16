import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Product } from '../../domain/model/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductReadService {

  constructor(private http: HttpClient) { }

  //CRUD

  findById(id: string): Promise<Product> {
    return firstValueFrom(this.http.get<Product>(`http://localhost:3000/product/${id}`));
  }

  findByName(name: string): Promise<Product[]> {
    return firstValueFrom(this.http.get<Product[]>(`http://localhost:3000/product?name=${name}`));
  }
  findAll(): Promise<Product[]>{
    return firstValueFrom(this.http.get<Product[]>('http://localhost:3000/product'));  
  }
  

}
