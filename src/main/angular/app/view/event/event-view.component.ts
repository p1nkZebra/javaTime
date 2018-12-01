import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventService} from "@app/service/event.service";
import {EventView} from "@app/model/view/eventView";
import {Dictionary} from "async";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Observable, Subject} from "rxjs";

export interface FilterControls extends Dictionary<AbstractControl> {
    dateFromControl: AbstractControl,
    dateToControl: AbstractControl,
    statusControl: AbstractControl,
    stringSearchControl: AbstractControl
}

@Component({
    selector: 'event-view',
    providers: [EventService],
    templateUrl: './event-view.component.html',
    styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit, OnDestroy {
    
    filteredEventView: EventView[] = [];

    filtersGroup: FormGroup;
    dateFromFc = new FormControl('');
    dateToFc = new FormControl('');
    statusFc = new FormControl('');
    searchStringFc = new FormControl('');

    statuses = ['show all', 'new', 'completed'];

    initRows: boolean = false;

    doOpenErrorMessageModal: boolean = false;

    private ngUnsubscribeSearchString: Subject<void> = new Subject<void>();
    private ngUnsubscribeStatusControl: Subject<void> = new Subject<void>();
    private ngUnsubscribeFilterDateFrom: Subject<void> = new Subject<void>();
    private ngUnsubscribeFilterDateTo: Subject<void> = new Subject<void>();

    constructor(private eventHttpService: EventService,
                private builder: FormBuilder) {
    }

    ngOnInit(): void {

        this.filtersGroup = this.builder.group({
            dateFromControl: this.dateFromFc,
            dateToControl: this.dateToFc,
            statusControl: this.statusFc,
            stringSearchControl: this.searchStringFc
        } as FilterControls);

        let dateNow = new Date().toLocaleDateString();
        this.filtersGroup.controls.dateFromControl.setValue(dateNow);
        this.filtersGroup.controls.dateToControl.setValue(dateNow);
        this.filtersGroup.controls.statusControl.setValue('show all');

        this.filtersGroup.controls.statusControl.valueChanges
            .takeUntil(this.ngUnsubscribeStatusControl)
            .map(() => this.filtersGroup.controls.statusControl.value)
            .distinctUntilChanged()
            .debounceTime(300)
            .flatMap(() => this.doFilter())
            .subscribe(
                (response) => {
                    this.filteredEventView = response;
                },
                error => {
                    this.doOpenErrorMessageModal = true;
                    console.log(error)
                },
                () => {
                });


        this.filtersGroup.controls.stringSearchControl.valueChanges
            .takeUntil(this.ngUnsubscribeSearchString)
            .map(() => this.filtersGroup.controls.stringSearchControl.value)
            .distinctUntilChanged()
            .debounceTime(300)
            .flatMap(() => this.doFilter())
            .subscribe(
                (response) => {
                    this.filteredEventView = response;
                },
                error => {
                    this.doOpenErrorMessageModal = true;
                    console.log(error)
                },
                () => {

                });

        this.filtersGroup.controls.dateFromControl.valueChanges
            .takeUntil(this.ngUnsubscribeFilterDateFrom)
            .map(() => this.filtersGroup.controls.dateFromControl.value)
            .distinctUntilChanged()
            .debounceTime(300)
            .flatMap(() => this.doFilter())
            .subscribe(
                (response) => {
                    this.filteredEventView = response;
                },
                error => {
                    this.doOpenErrorMessageModal = true;
                    console.log(error)
                },
                () => {

                });


        this.filtersGroup.controls.dateToControl.valueChanges
            .takeUntil(this.ngUnsubscribeFilterDateTo)
            .map(() => this.filtersGroup.controls.dateToControl.value)
            .distinctUntilChanged()
            .debounceTime(300)
            .flatMap(() => this.doFilter())
            .subscribe(
                (response) => {
                    this.filteredEventView = response;
                },
                error => {
                    this.doOpenErrorMessageModal = true;
                    console.log(error)
                },
                () => {

                });


        this.eventHttpService.getFilteredEventView(
            this.filtersGroup.controls.dateFromControl.value,
            this.filtersGroup.controls.dateToControl.value,
            this.filtersGroup.controls.statusControl.value,
            this.filtersGroup.controls.stringSearchControl.value
        )
            .finally(() => this.initRows = true)
            .subscribe(response => {
                this.filteredEventView = response;
            });


    }


    ngOnDestroy() {
        this.ngUnsubscribeSearchString.next();
        this.ngUnsubscribeSearchString.complete();
        this.ngUnsubscribeStatusControl.next();
        this.ngUnsubscribeStatusControl.complete();
        this.ngUnsubscribeFilterDateFrom.next();
        this.ngUnsubscribeFilterDateFrom.complete();
        this.ngUnsubscribeFilterDateTo.next();
        this.ngUnsubscribeFilterDateTo.complete();
    }


    doFilter(): Observable<EventView[]> {
        if (this.initRows === false) {
            return Observable.of(this.filteredEventView);
        }

        return this.eventHttpService.getFilteredEventView(
            this.filtersGroup.controls.dateFromControl.value,
            this.filtersGroup.controls.dateToControl.value,
            this.filtersGroup.controls.statusControl.value,
            this.filtersGroup.controls.stringSearchControl.value
        );
    }
    
}