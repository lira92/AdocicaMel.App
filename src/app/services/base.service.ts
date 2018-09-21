import { HttpHeaders } from '@angular/common/http';

export abstract class BaseService {
    getHeaders(): HttpHeaders {
        const access_token = localStorage.getItem('adocicamel.token');
        const headers = new HttpHeaders(
            { 'Authorization': `Bearer ${access_token}` }
        );
        return headers;
    }
}
