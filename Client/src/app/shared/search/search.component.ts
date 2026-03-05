import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchText: string = '';

  @Output() searchInputChange: EventEmitter<string> = new EventEmitter<string>();

  onSearch(searchInput: string) {
    this.searchText = searchInput;
    this.searchInputChange.emit(this.searchText);
  }
}
