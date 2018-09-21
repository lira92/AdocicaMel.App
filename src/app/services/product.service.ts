import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getProducts() {
    return this.http
      .get<any>(environment.productServiceInterface.url + '/v1/products');
  }

  getVendorProduct(productIdentifier: Number, vendor: String) {
    return this.http
      .get<any>(environment.productServiceInterface.url + `/vendors/${vendor}/products/${productIdentifier}`, {headers: this.getHeaders()});
  }

  getSupportedVendors() {
    return this.http
      .get<any>(environment.productServiceInterface.url + '/vendors', {headers: this.getHeaders()});
  }

  importProduct(requestData: any) {
    return this.http
      .post<any>(environment.productServiceInterface.url + '/v1/products', requestData, {headers: this.getHeaders()});
  }
}
