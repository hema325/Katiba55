import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageItemComponent, PageLinkDirective, PaginationComponent } from '@coreui/angular';
import { range } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  imports:
    [
      PaginationComponent,
      PageItemComponent,
      RouterLink,
      PageLinkDirective
    ]
})
export class PaginatorComponent implements OnInit {

  @Input() totalPages: number = 1;
  @Input() currentPage: number = 1;
  @Output() currentPageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onPageChange(page: number) {
    if (page != this.currentPage) {
      this.currentPage = page;
      this.currentPageChange.emit(page);
    }
  }

  range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  }

}
