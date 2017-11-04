import { Component, OnInit } from '@angular/core';
import { IBond } from './bond.model';
import { BondSearchService } from './bondsearch.service';
import { IFilterPredicate, FilterPredicate } from './filterPredicate.model';
import { IFilterProperty, FilterProperty } from './filterProperty.model';

@Component({
    selector: 'bond-list',
    templateUrl: './bondList.component.html',
    styleUrls: ['./bondList.component.css']
})
export class BondListComponent implements OnInit {
    bondProperties: IFilterProperty[] = [];
    bondList: IBond[] = [];
    filteredBondList: IBond[] = [];

    totalNumberOfRecords: number;
    currentPageNumber: number;
    readonly numberOfRecordsPerPage: number = 10;
    currentPageList: IBond[] = [];

    constructor(private _bondSearchService: BondSearchService) { }

    ngOnInit() {
        this.bondProperties = this._bondSearchService.getBondProperties();
        this.bondList = this._bondSearchService.getBondList();
        this.filteredBondList = this.bondList.slice();
        this.displayFirstPage();
    }

    displayFirstPage(): void {
        this.totalNumberOfRecords = this.filteredBondList.length;
        this.currentPageNumber = 1;
        this.currentPageList = this.getCurrentPageList();
    }

    getCurrentPageList(): IBond[] {
        let start = (this.currentPageNumber -1) * this.numberOfRecordsPerPage;
        let end = start + this.numberOfRecordsPerPage;
        let listToReturn = this.filteredBondList.slice(start, end);
        return listToReturn;
    }

    onPageChanged(pageNumber: number) {
        this.currentPageNumber = pageNumber;
        this.currentPageList = this.getCurrentPageList();
    }

    onFilterPredicatesChanged($event): void {
        let filterPredicates: IFilterPredicate[] = $event.value;
        this.filteredBondList = this.applyFilterPredicates(filterPredicates);
        this.displayFirstPage();
    }

    applyFilterPredicates(filterPredicates: IFilterPredicate[]): IBond[] {
        let listToReturn = this.bondList.slice();
        filterPredicates.forEach(filterPredicate => {
            listToReturn = this.applyFilterPredicate(listToReturn, filterPredicate);
        });
        return listToReturn;
    }

    applyFilterPredicate(listToFilter: IBond[], filterPredicate: IFilterPredicate): IBond[] {
        console.log('apply filter ' + filterPredicate.toString());
        let propertyToFilter: string = filterPredicate.propertyId; 
        propertyToFilter = propertyToFilter.replace(/\s/g, '');

        // Sting filters.        
        if (filterPredicate.operator === 'starts with') {
            listToFilter = listToFilter.filter(
                bond => bond[propertyToFilter].toUpperCase().startsWith(filterPredicate.value.toUpperCase()));
        }
        if (filterPredicate.operator === 'equals') {
            listToFilter = listToFilter.filter(
                bond => bond[propertyToFilter].toUpperCase() === (filterPredicate.value.toUpperCase()));
        }
        if (filterPredicate.operator === 'contains') {
            listToFilter = listToFilter.filter(
                bond => bond[propertyToFilter].toUpperCase().indexOf(filterPredicate.value.toUpperCase()) >= 0);
        }
        if (filterPredicate.operator === 'does not contain') {
            listToFilter = listToFilter.filter(
                bond => bond[propertyToFilter].toUpperCase().indexOf(filterPredicate.value.toUpperCase()) === -1);
        }
        if (filterPredicate.operator === 'does not equal') {
            listToFilter = listToFilter.filter(
                bond => bond[propertyToFilter].toUpperCase() !== filterPredicate.value.toUpperCase());
        }

        // Number filters.
        if (filterPredicate.operator === '=') {
            listToFilter = listToFilter.filter(bond => bond[propertyToFilter] === Number(filterPredicate.value));
        }
        if (filterPredicate.operator === '!=') {
            listToFilter = listToFilter.filter(bond => bond[propertyToFilter] !== Number(filterPredicate.value));
        }
        if (filterPredicate.operator === '>') {
            listToFilter = listToFilter.filter(bond => bond[propertyToFilter] > Number(filterPredicate.value));
        }
        if (filterPredicate.operator === '<') {
            listToFilter = listToFilter.filter(bond => bond[propertyToFilter] < Number(filterPredicate.value));
        }
        if (filterPredicate.operator === '<=') {
            listToFilter = listToFilter.filter(bond => bond[propertyToFilter] <= Number(filterPredicate.value));
        }
        if (filterPredicate.operator === '>=') {
            listToFilter = listToFilter.filter(bond => bond[propertyToFilter] >= Number(filterPredicate.value));
        }

        return listToFilter;
    }
}