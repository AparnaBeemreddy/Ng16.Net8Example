import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillContainerComponent } from './skill.container.component';

describe('SkillContainerComponent', () => {
  let component: SkillContainerComponent;
  let fixture: ComponentFixture<SkillContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkillContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
