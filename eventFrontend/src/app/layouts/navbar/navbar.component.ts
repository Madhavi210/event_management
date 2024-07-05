import Swal from 'sweetalert2';
import { LoginService } from './../../core/services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
    constructor(private loginService:LoginService, private userService:UserService){}
    isLoggedIn: boolean = false;
    userId: string | null = null;
    

    ngOnInit(): void {
      this.userId = localStorage.getItem('userId');
      this.isLoggedIn = this.loginService.isLoggedIn();
    }

    logout():void {
      this.loginService.logout();
      Swal.fire("success","user logout successfully","success")
    }
}
