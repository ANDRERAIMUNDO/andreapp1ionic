import { StorageService } from './storage.service';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from '@angular/core';
import { LocalUser } from '../models/local_user';

@Injectable()
export class AuthService {
  constructor(public http: HttpClient, public stotage: StorageService) {

  }
  authenticate(creds: CredenciaisDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`,
      creds, {
      observe: 'response',
      responseType: 'text'
    });
  }
  successfullLogin(authorizationValue: string) {
    let tok = authorizationValue.substring(7);
    let user: LocalUser = {
      token: tok
    };
    this.stotage.setLocalUser(user);
  }
  logout() {
    this.stotage.setLocalUser(null);
  }
}
