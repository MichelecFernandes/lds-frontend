import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductReadService } from '../../../../services/product/product-read.service';
import { Products } from '../product-list/product-list.component';
import { ProductUpdateService } from '../../../../services/product/product-update.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lds-product-edit',
  standalone: true,
  imports: [],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {


  productInformation?: Products;

  form: FormGroup;

  constructor(private activateRouter: ActivatedRoute, private productReadService: ProductReadService, private productUpdateService: ProductUpdateService, private toastrService: ToastrService, private router: Router){

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

  async update(){

    try {
      let product: Products = {
        id: this.productInformation?.id!,
        name: this.productInformation?.name!,
        price: this.productInformation?.price!
  
      }

      console.log(product);
      await this.productUpdateService.update(product);
      this.toastrService.success('Produto atualizado com sucesso.');
      this.router.navigate(['product/list']);
      
    } catch (error) {
      this.toastrService.error('Erro. Produto nao atualizado.');
      
    }


  }


}
