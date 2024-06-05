import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ MaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  categories = [
    ["character", "Characters", "characters"],
    ["location", "Locations", "locations"],
    ["creature", "Creatures", "creatures"],
    ["other", "Other", "other"]
  ]

  constructor(private router : Router){

  }
  ngOnInit(): void {
  }

  onClick(path: string){
    this.router.navigate([`/${path}`]);
  }

  
}
