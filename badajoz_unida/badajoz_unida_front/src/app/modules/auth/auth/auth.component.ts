import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../security/services/auth/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{

  isFormRegistro: boolean = false;

  constructor(private _authService: AuthService) {
  }

  ngOnInit() {
    this._authService.getAuthMessage().subscribe((data: boolean) => {
      setTimeout(() => {
        this.isFormRegistro = data;
      });
    });
  }

  goToRegistro(){
    this._authService.goToRegistro();
  }

  goToLogin(){
    this._authService.goToLogin()
  }

}
