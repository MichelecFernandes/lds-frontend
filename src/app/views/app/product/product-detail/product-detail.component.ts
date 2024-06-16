import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductReadService } from '../../../../services/product/product-read.service';
import { Product } from '../../../../domain/model/product.model';

@Component({
  selector: 'lds-product-detail',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent  implements OnInit{
  // ?fala que a variavel pode ser nula ou ter um nao
  // ! faala que é obrigatorio ter o valor
  productInformation?: Product;

  constructor(private route: ActivatedRoute, private productReadService: ProductReadService) {

  }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.log(`ID do produto: ${productId}`);
    this.loadProductById(productId!);
  }

  async loadProductById(productId: string){
    let product = await this.productReadService.findById(productId);
    console.log(product);
    this.productInformation = product;
  }

}
