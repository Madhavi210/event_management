import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../core/services/events/events.service';
import { LoginService } from 'src/app/core/services/login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  events: any[] = [];  // Define an array to hold events
  isLoggedIn: boolean = false;

  constructor(private eventService: EventsService, private loginService:LoginService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (events: any[]) => {
        this.events = events;
        console.log(events);
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }
}