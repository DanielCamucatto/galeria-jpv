import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent {
  constructor(private router: Router){}

  navigateToUpload(): void {
    this.router.navigate(['upload'])
  }
}
