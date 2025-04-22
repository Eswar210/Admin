import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }

  // Fetch all products
  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Optionally: Fetch product by ID
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }
  
  // PUT: Update existing product
  updateProduct(id: number, updatedProduct: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedProduct);
  }
  
  // DELETE: Remove a product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
