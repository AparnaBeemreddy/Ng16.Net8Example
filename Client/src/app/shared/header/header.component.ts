import { Component } from '@angular/core';

import { TopMenuComponent } from './top-menu/top-menu.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TopMenuComponent, MainMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title: string = 'eLearn';
}
