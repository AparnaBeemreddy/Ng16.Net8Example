import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SkillModel } from '../../../models/skill.model';
import { HighlightDirective } from "../../../directives/highlight.directive";

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [CommonModule, HighlightDirective],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss'
})
export class SkillComponent {
  @Input() skill: SkillModel;
}
