import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as fontawesome from '@fortawesome/free-solid-svg-icons';
import { ProductReadService } from '../../../../services/product/product-read.service';
import { ProductDeleteService } from '../../../../services/product/product-delete.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../../domain/model/product.model';

@Component({
  selector: 'lds-product-list',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  fa = fontawesome;

  products: Product[] = [];

  constructor(private productReadService: ProductReadService, private productDeleteService: ProductDeleteService, private toastrService: ToastrService){

  }

  ngOnInit(): void {
    this.loadProducts();
    
  }

  async loadProducts(){
    this.products = await this.productReadService.findAll();

  }

  async deleteProduct(productId: string) {
    try {
      // Erro comentado com o proposito de cair no catch(error)
      // throw new Error('Opa, bão?');
      console.log('iniciando a remocao do produto' + productId);
      await this.productDeleteService.delete(productId);
      this.toastrService.success('Produto removido com sucesso');
      await this.loadProducts();
      
    } catch (error) {
      this.toastrService.error('Nao foi possivel remover o produto');
      
    }


  }




  // products: Products[] = [
  //   {
  //     id: 1,
  //     name: 'Computador Dell',
  //     price: 44.54
  //   },
  //   {
  //     id: 2,
  //     name: 'Computador Acer',
  //     price: 99.99
  //   },
  //   {
  //     id: 3,
  //     name: 'Computador Positivo',
  //     price: 12.40
  //   },
  //   {
  //     id: 4,
  //     name: 'Computador LG',
  //     price: 98.75
  //   },
  //   {
  //     id: 5,
  //     name: 'Notebook Dell',
  //     price: 102.05
  //   },
  //   {
  //     id: 6,
  //     name: 'Notebook Acer',
  //     price: 35.70
  //   },
  //   {
  //     id: 7,
  //     name: 'Notebook Positivo',
  //     price: 96.10
  //   },
  //   {
  //     id: 8,
  //     name: 'Notebook LG',
  //     price: 65.75
  //   }

  // ];

  

}