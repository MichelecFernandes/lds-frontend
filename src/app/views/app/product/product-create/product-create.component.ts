import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../../domain/model/product.model';
import { ProductCreateService } from '../../../../services/product/product-create.service';

@Component({
  selector: 'lds-product-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  
  ],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit {

  form: FormGroup;

  nameMinLength: number = 3;
  nameMaxLength: number = 10;
  priceMinValue: number = 1;
  priceMaxValue: number = 500;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private productCreateService: ProductCreateService) {

    this.initializeForm();
  }

  ngOnInit(): void {
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      price: ['', [Validators.required, Validators.min(this.priceMinValue), Validators.max(this.priceMaxValue)]],
    });
  }

  async create() {
    const product: Product = {
      name: this.form.controls['name'].value,
      price: this.form.controls['price'].value,
    }

    console.log('preparando para criar o produto...');
    console.log(product);

    try {
      await this.productCreateService.create(product);
      this.toastr.success('Dados salvos com sucesso!');
      this.router.navigate(['product/list']);
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  validateFields() {
    return this.form.controls['name'].valid
      && this.form.controls['price'].valid;
  }



}
