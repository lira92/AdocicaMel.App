import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-import-product-page',
  templateUrl: './import-product-page.component.html',
  styleUrls: ['./import-product-page.component.css']
})
export class ImportProductPageComponent implements OnInit {
  public vendors: any[] = [];
  public product:any;
  public form: FormGroup;
  public loadingProduct:Boolean = false;
  
  constructor(private fb: FormBuilder, private productsService: ProductService) {
    this.form = this.fb.group({
      vendor: ['', Validators.compose([
        Validators.required
      ])],
      productIdentifier: ['', Validators.compose([
        Validators.required
      ])],
      price: ['', Validators.compose([
        Validators.min(0.01),
        Validators.required
      ])]
    });
  }

  ngOnInit() {
    this.getVendors();
  }

  getVendors() {
    this.productsService.getSupportedVendors().subscribe(result => {
      this.vendors = result;
    })
  }

  getProductData() {
    this.loadingProduct = true;
    let formData = this.form.value;
    this.productsService.getVendorProduct(formData.productIdentifier, formData.vendor).subscribe(result => {
      this.loadingProduct = false;
      this.product = result;
      console.log(this.product);
    })
  }

}
