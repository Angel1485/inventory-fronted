import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  /**
   * Llamamos las categorias del Sprintboot
   * Llama todas las categorias
   * @returns 
   */
  getCategories(){
    const endpoint_api = 'http://localhost:8080/api/v1/categories';
    return this.http.get(endpoint_api);
  }

  /**
   * Guardar las categorias del Sprintboot
   * Guarda todas las categorias
   * @returns 
   */
  saveCategories(body: any){
    const endpoint_api = 'http://localhost:8080/api/v1/categories';
    return this.http.post(endpoint_api, body);
  }

  /**
   * Edita las categorias del Sprintboot
   * Edita todas las categorias
   * @returns 
   */
  updateCategories(body: any, id: any){
    const endpoint_api = `http://localhost:8080/api/v1/categories/${id}`;
    return this.http.put(endpoint_api, body);
  }

  /**
   * Elimina las categorias del Sprintboot
   * Elimina todas las categorias
   * @returns 
   */
  deleteCategories(id: any){
    const endpoint_api = `http://localhost:8080/api/v1/categories/${id}`;
    return this.http.delete(endpoint_api);
  }

  /**
   * Buscar las categorias del Sprintboot
   * Busca todas las categorias
   * @returns 
   */
  getCategorieById(id: any){
    const endpoint_api = `http://localhost:8080/api/v1/categories/${id}`;
    return this.http.get(endpoint_api);
  }

}
