import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../core/services/events/events.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  events: any[] = [];  // Define an array to hold events

  constructor(private eventService: EventsService) { }

  ngOnInit(): void {
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