import {Component, OnDestroy, OnInit} from '@angular/core';
import {RawEvent} from "@app/model/tables/rawEvent";
import {EventService} from "@app/service/event.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {finalize, tap} from "rxjs/operators";
import {Dictionary} from "async";
import {ContributionService} from "@app/service/contribution.service";
import {RawContribution} from "@app/model/tables/rawContribution";

export interface EventFields extends Dictionary<AbstractControl> {
    contributionControl: AbstractControl,
    nameControl: AbstractControl,
    dateControl: AbstractControl,
    cronPeriodControl: AbstractControl,
    userValueControl: AbstractControl,
    commentControl: AbstractControl,
}

@Component({
    selector: 'event-table',
    providers: [EventService, ContributionService],
    templateUrl: './event-table.component.html',
    styleUrls: ['./event-table.component.scss']
})
export class EventTableComponent implements OnInit, OnDestroy {

    allEvents: RawEvent[] = [];
    selectedEvents: RawEvent[] = [];

    doOpenResourceModal: boolean = false;
    modalTitle: string;
    TITLE_ADD_NEW: string = "Add new Event";
    TITLE_EDIT: string = "Edit Event";

    fieldsFormGroup: FormGroup;

    contributionList: RawContribution[] = [];


    constructor(private httpEventService: EventService,
                private httpContributionService: ContributionService,
                private builder: FormBuilder) {
    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
        this.fieldsFormGroup = this.builder.group({
            contributionControl: new FormControl(),
            nameControl: new FormControl(),
            dateControl: new FormControl(),
            cronPeriodControl: new FormControl(),
            userValueControl: new FormControl(),
            commentControl: new FormControl(),
        } as EventFields);

        this.updateTable();
        this.loadContributions()
    }


    updateTable() {
        this.httpEventService.getEventTable()
            .pipe(
                tap(() => {
                    // do something before all actions
                }),
                finalize(() => {
                    // do something after all actions
                })
            ).subscribe(
            response => {
                this.allEvents = response;
            },
            (error) => {
                console.log(error);
            });
    }

    onAdd() {
        this.doOpenResourceModal = true;
        this.modalTitle = this.TITLE_ADD_NEW;
    }

    onEdit() {
        this.doOpenResourceModal = true;
        this.modalTitle = this.TITLE_EDIT;

        let selectedRow = this.selectedEvents[0];

        let inputs = this.fieldsFormGroup.controls as EventFields;
        let contribution = this.contributionList.find(item => item.id === selectedRow.contributionId);
        inputs.contributionControl.setValue(contribution.name);
        inputs.nameControl.setValue(selectedRow.name);
        inputs.dateControl.setValue(selectedRow.eventDate);
        inputs.cronPeriodControl.setValue(selectedRow.cronPeriod);
        inputs.userValueControl.setValue(selectedRow.userValue);
        inputs.commentControl.setValue(selectedRow.comment);
    }

    onSave() {

        let inputs = this.fieldsFormGroup.controls as EventFields;
        let contribution: RawContribution = inputs.contributionControl.value;
        console.log("inputs.contributionControl: ", inputs.contributionControl);
        console.log("inputs.contributionControl.value: ", inputs.contributionControl.value);

        let selectedRows = this.selectedEvents;
        let event: RawEvent = selectedRows.length == 0 ? new RawEvent() : selectedRows[0];
        event.contributionId = contribution.id;
        event.name = inputs.nameControl.value;
        event.eventDate = inputs.dateControl.value;
        event.cronPeriod = inputs.cronPeriodControl.value;
        event.userValue = inputs.userValueControl.value;
        event.comment = inputs.commentControl.value;

        this.httpEventService.addEvent(event)
            .pipe(
                tap(() => {
                    // do something before all actions
                }),
                finalize(() => {
                    // do something after all actions
                    this.closeModal();
                    this.updateTable();
                })
            ).subscribe();
    }

    closeModal() {
        this.doOpenResourceModal = false;
        this.fieldsFormGroup.reset();
    }

    onDelete() {
        console.log("onDelete");
    }

    loadContributions() {
        this.httpContributionService.getContributionTable()
            .pipe(
                tap(() => {
                    // do something before all actions
                }),
                finalize(() => {
                    // do something after all actions
                })
            ).subscribe(
            response => {
                this.contributionList = response;
            },
            (error) => {
                console.log(error);
            });

    }

}