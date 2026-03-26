import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss'
})
export class ProductFilterComponent {
  @Input() all: number = 0;
  @Input() inStock: number = 0;

  selectedFilter: string = 'all';

  @Output() selectedFilterChange: EventEmitter<string> = new EventEmitter<string>();

  onSelectedFilterChange() {
    this.selectedFilterChange.emit(this.selectedFilter);
  }

}
