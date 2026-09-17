import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /**
   * Llamamos los productos del Sprintboot
   * Llama todos los productos
   * @returns 
   */
  getProducts(){
    const endpoint_api = 'http://localhost:8080/api/v1/products';
    return this.http.get(endpoint_api);
  }

  /**
   * Guardar los productos del Sprintboot
   * Guarda todos los productos
   * @returns 
   */
  saveProducts(body: any){
    const endpoint_api = 'http://localhost:8080/api/v1/products';
    return this.http.post(endpoint_api, body);
  }

   /**
   * Edita las productos del Sprintboot
   * Edita todas los productos
   * @returns 
   */
  updateProducts(body: any, id: any){
    const endpoint_api = `http://localhost:8080/api/v1/products/${id}`;
    return this.http.put(endpoint_api, body);
  }

   /**
   * Elimina los productos del Sprintboot
   * Elimina todos los productos
   * @returns 
   */
  deleteProducts(id: any){
    const endpoint_api = `http://localhost:8080/api/v1/products/${id}`;
    return this.http.delete(endpoint_api);
  }

  /**
   * Buscar productos del Sprintboot
   * Busca todos los productos
   * @returns 
   */
  getProductsByName(name: any){
    const endpoint_api = `http://localhost:8080/api/v1/products/filter/${name}`;
    return this.http.get(endpoint_api);
  }

}
