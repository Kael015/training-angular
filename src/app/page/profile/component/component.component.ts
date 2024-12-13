import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-component',
  standalone: false,
  
  templateUrl: './component.component.html',
  // styleUrl: './component.component.css'
})
export class ComponentComponent implements OnInit {
  profileData: any;

  // constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileData = ProfileService.getData(); 
  }

}
