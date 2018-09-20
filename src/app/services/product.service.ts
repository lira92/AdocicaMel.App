import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  getProducts() {
    return this.http.get(environment.productServiceInterface.url + '/v1/products')
    .pipe(
      map((response) => {
        return response.json();
      })
    );
  }

  getVendorProduct(productIdentifier: Number, vendor: String) {
    const options = new RequestOptions({headers: this.getHeaders()});
    return this.http.get(environment.productServiceInterface.url + `/vendors/${vendor}/products/${productIdentifier}`, options)
    .pipe(
      map((response) => {
        return response.json();
      })
    );
  }

  getSupportedVendors() {
    const options = new RequestOptions({headers: this.getHeaders()});
    return this.http.get(environment.productServiceInterface.url + '/vendors', options)
    .pipe(
      map((response) => {
        return response.json();
      })
    );
  }

  importProduct(requestData: any) {
    const options = new RequestOptions({headers: this.getHeaders()});
    return this.http.post(environment.productServiceInterface.url + '/v1/products', requestData, options);
  }
}
