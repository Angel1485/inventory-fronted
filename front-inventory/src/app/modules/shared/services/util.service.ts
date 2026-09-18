import { inject, Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private KeycloakService = inject(KeycloakService)  //Injecta la clase Keycloak
  constructor() { }

  getRoles(){
    return this.KeycloakService.getUserRoles();
  }

  isAdmin(){
    let roles = this.KeycloakService.getUserRoles().filter(role => role == "Admin")

    if(roles.length > 0 ){
      return true;
    }else {
      return false;
    }
  }
}
