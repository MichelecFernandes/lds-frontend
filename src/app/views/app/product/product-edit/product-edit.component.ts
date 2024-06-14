import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductReadService } from '../../../../services/product/product-read.service';
import { Products } from '../product-list/product-list.component';

@Component({
  selector: 'lds-product-edit',
  standalone: true,
  imports: [],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {


  productInformation?: Products;

  constructor(private activateRouter: ActivatedRoute, private productReadService: ProductReadService){

  }

  ngOnInit(): void {
    let productId = this.activateRouter.snapshot.paramMap.get('id');
    this.loadProductById(productId!);
  
  }

  async loadProductById(productId: string){
    let product = await this.productReadService.findById(productId);
    console.log(product);
    this.productInformation = product;
  }

}
