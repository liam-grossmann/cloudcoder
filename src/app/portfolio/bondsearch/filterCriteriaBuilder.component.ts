import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFilterPredicate, FilterPredicate } from './filterPredicate.model';
import { IFilterProperty, FilterProperty } from './filterProperty.model';

@Component({
    selector: 'filter-criteria-builder',
    templateUrl: './filterCriteriaBuilder.component.html',
    styleUrls: ['./bondList.component.css']
})
export class FilterCriteriaBuilderComponent implements OnInit {

    @Input()  filterProperties: IFilterProperty[] = [];    
    @Output() filterPredicatesChanged = new EventEmitter();    
    
    stringOperators: string[] = ['contains', 'equals', 'starts with', 'does not contain', 'does not equal'];
    numberOperators: string[] = ['=', '!=', '<', '>', '<=', '>='];
    operators: string[] = [];
    filterPredicates: IFilterPredicate[] = []; 

    selectedFilterProperty: IFilterProperty;
    selectedOperator: string;
    filterValue: string;

    constructor() {}

    ngOnInit() { }

    onFilterPropertySelected(): void {
        if (this.selectedFilterProperty.type === 'string') {
            this.operators = this.stringOperators.slice();
        } else {
            this.operators = this.numberOperators.slice();
        }        
    }

    doAddFilterPredicate(): void {
        let filterPredicate: IFilterPredicate = new FilterPredicate(
            this.selectedFilterProperty.id,
            this.selectedFilterProperty.name,
            this.selectedOperator,
            this.filterValue);
        this.filterPredicates.push(filterPredicate);
        this.resetForm();
        this.raiseFilterPredicatesChangedEvent();
    }

    doRemoveFilterPredicate(filterPredicate: IFilterPredicate): void {
        let index = this.filterPredicates.indexOf(filterPredicate);
        if (index > -1) {
             this.filterPredicates.splice(index, 1);
        }
        this.raiseFilterPredicatesChangedEvent();
    }

    raiseFilterPredicatesChangedEvent(): void {
        this.filterPredicatesChanged.emit({
            value: this.filterPredicates
        });
    }

    resetForm(): void {
        this.selectedFilterProperty = null;
        this.selectedOperator = '';
        this.filterValue = '';
    }

     // When user presses 'enter' on the value test box, add the filter predicate
     onValueTextBoxKeyPress(event) {
        if (event.keyCode === 13) {
            this.doAddFilterPredicate();
        }
    }
}
