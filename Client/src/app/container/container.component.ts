import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchComponent } from '../shared/search/search.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { SkillDetailComponent } from './skill-detail/skill-detail.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [SearchComponent, SkillListComponent, SkillDetailComponent, CommonModule],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {
  @Input() searchText: string = '';
  @ViewChild(SkillListComponent) skillListComponent: SkillListComponent;
 
  onSearchInputChange(searchText: string) {
    debugger;
    this.searchText = searchText;
  }
}
