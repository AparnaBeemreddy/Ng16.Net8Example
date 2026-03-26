import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Input() all: number = 0;
  @Input() certified: number = 0;

  selectedFilter: string = 'all';

  @Output() selectedFilterChange: EventEmitter<string> = new EventEmitter<string>();

  onSelectedFilterChange() {
    this.selectedFilterChange.emit(this.selectedFilter);
  }
}
