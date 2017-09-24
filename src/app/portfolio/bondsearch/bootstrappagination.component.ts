import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'bootstrap-pagination',
  template: `
  <ul class="pagination pagination-sm">
    <li *ngFor="let pageNumber of arrPageList" 
        [ngClass]="{'active':currentPageNumber === pageNumber}">
        <a (click)="setCurrentPage(pageNumber)">{{pageNumber}}</a>
    </li>
  </ul>
  `
})
export class BootstrapPaginationComponent implements OnInit, OnChanges{
    @Input() totalNumberOfItems: number;
    @Input() itemsPerPage: number;
    @Input() currentPageNumber: number;
    private totalNumberOfPages: number;
    public arrPageList: number[];
    @Output() onPageChanged = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit(): void {
        this.doPaging();
    };

    ngOnChanges(): void {
        this.doPaging();
    }

    doPaging(): void {
        this.totalNumberOfPages = Math.ceil(this.totalNumberOfItems / this.itemsPerPage);
        this.arrPageList = Array(this.totalNumberOfPages).fill(5).map((x, i) => i + 1);
    }

    setCurrentPage(pageNumber: number) {
         this.currentPageNumber = pageNumber;
         this.onPageChanged.emit(pageNumber);
    }
}