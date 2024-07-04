import Swal from 'sweetalert2';
import { LoginService } from './../../core/services/login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
    constructor(private loginService:LoginService){}

    ngOnInit(): void {
    }

    logout():void {
      this.loginService.logout();
      Swal.fire("success","user logout successfully","success")
    }
}
