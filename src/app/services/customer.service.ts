import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:5000/api/customers';

  constructor(private http: HttpClient) { }

  registerCustomer(customerId: any): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customerId);
  }

  renewCustomerPlan(id: string, planData: any): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${id}/renew`, planData);
  }

  updateCustomerPlan(id: string, planData: any): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${id}/plan`, planData);
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>('/assets/mock-customers.json');
  }

  getFormConfig(): Observable<any> {
    return this.http.get('/assets/form-config.json');
  }
}
