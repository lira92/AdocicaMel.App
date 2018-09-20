import { Headers } from '@angular/http';

export abstract class BaseService {
    getHeaders(): Headers {
        const access_token = localStorage.getItem('adocicamel.token');
        const headers = new Headers(
            { 'Authorization': `Bearer ${access_token}` }
        );
        return headers;
    }
}
