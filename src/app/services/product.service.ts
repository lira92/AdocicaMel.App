import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: Http) { }

  getProducts() {
    return this.http.get(environment.apiBaseUrl + 'v2/59506124120000680c8c78d8')
    .pipe(
      map((response:Response) => {
        return response.json();
      })
    );
  }

  getVendorProduct(productIdentifier: Number, vendor: String) {
    let headers = new Headers({ 'Ocp-Apim-Subscription-Key': environment.productServiceInterface.SubscriptionKey });
    let options = new RequestOptions({headers: headers});
    return this.http.get(environment.productServiceInterface.url + `/vendors/${vendor}/products/${productIdentifier}`, options)
    .pipe(
      map((response:Response) => {
        return response.json();
      })
    );
  }

  getSupportedVendors() {
    let headers = new Headers({ 'Ocp-Apim-Subscription-Key': environment.productServiceInterface.SubscriptionKey });
    let options = new RequestOptions({headers: headers});
    return this.http.get(environment.productServiceInterface.url + "/vendors", options)
    .pipe(
      map((response:Response) => {
        return response.json();
      })
    );
  }
}
