import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillListComponent } from '../skill-list/skill-list.component';
import { SkillModel } from '../../models/skill.model';

@Component({
  selector: 'app-skill-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-detail.component.html',
  styleUrl: './skill-detail.component.scss'
})
export class SkillDetailComponent implements OnInit {
  @Input() skillListComponent: SkillListComponent = undefined;
  skill: SkillModel;

  ngOnInit(): void {
    debugger;
    this.skill = this.skillListComponent.selectedSkill;
  }
}
