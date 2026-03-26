import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { SkillDetailComponent } from '../skill.container/skill-detail/skill-detail.component';
import { SkillListComponent } from '../skill.container/skill-list/skill-list.component';
import { SearchComponent } from '../shared/search/search.component';

@Component({
  selector: 'app-skill.container',
  standalone: true,
  imports: [SearchComponent, SkillListComponent, SkillDetailComponent, CommonModule],
  templateUrl: './skill.container.component.html',
  styleUrl: './skill.container.component.scss'
})
export class SkillContainerComponent {
  @Input() searchText: string = '';
  @ViewChild(SkillListComponent) skillListComponent: SkillListComponent;
 
  onSearchInputChange(searchText: string) {
    debugger;
    this.searchText = searchText;
  }
}
  