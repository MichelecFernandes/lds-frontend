import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductReadService } from '../../../../services/product/product-read.service';
import { Products } from '../product-list/product-list.component';
import { ProductUpdateService } from '../../../../services/product/product-update.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../../domain/model/product.model';

@Component({
  selector: 'lds-product-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {


  productId?: string;

  form: FormGroup;

  nameMinLength: number = 3;
  nameMaxLength: number = 10;
  priceMinValue: number = 1;
  priceMaxValue: number = 500;

  constructor(private activateRouter: ActivatedRoute, private productReadService: ProductReadService, private productUpdateService: ProductUpdateService, private toastrService: ToastrService, private router: Router, private formBuilder: FormBuilder){
    this.initializeForm();
  }
  
  initializeForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      price: ['', [Validators.required, Validators.min(this.priceMinValue), Validators.max(this.priceMaxValue)]],
    });
  }

  ngOnInit(): void {
    let productId = this.activateRouter.snapshot.paramMap.get('id');
    this.productId = productId!;
    this.loadProductById(productId!);
  
  }

  async loadProductById(productId: string){
    let product = await this.productReadService.findById(productId);
    console.log(product);
    this.form.controls['name'].setValue(product.name);
    this.form.controls['price'].setValue(product.price);
  }

  async update(){

    try {
      // let product: Products = {
      //   id: this.productInformation?.id!,
      //   name: this.productInformation?.name!,
      //   price: this.productInformation?.price!

      const product: Product = {
        id: this.productId!,
        name: this.form.controls['name'].value,
        price: this.form.controls['price'].value,
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
