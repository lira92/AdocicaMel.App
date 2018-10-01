import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getTags(search: string) {
    return this.http
      .get<any>(environment.api.url + `/v1/tags?tagName=${search}`)
      .pipe(
        map(data => data.map(item => item.name))
      );
  }

  getProducts(searchName: string = '', searchTags: string[] = [], sort: string = '') {
    const tagsQuery = searchTags.map(tag => `tags=${tag}`).join('&');
    return this.http
      .get<any>(environment.api.url
        + `/v1/products?name=${searchName}${tagsQuery ? '&' : ''}${tagsQuery}&sort=${sort}`);
  }

  getVendorProduct(productIdentifier: Number, vendor: String) {
    return this.http
      .get<any>(environment.api.url + `/vendors/${vendor}/products/${productIdentifier}`, {headers: this.getHeaders()});
  }

  getSupportedVendors() {
    return this.http
      .get<any>(environment.api.url + '/vendors', {headers: this.getHeaders()});
  }

  importProduct(requestData: any) {
    return this.http
      .post<any>(environment.api.url + '/v1/products', requestData, {headers: this.getHeaders()});
  }
}
