import {Component, OnDestroy, OnInit} from '@angular/core';
import {RawEvent} from "@app/model/tables/rawEvent";
import {EventService} from "@app/service/event.service";
import {FormBuilder} from "@angular/forms";


@Component({
    selector: 'event-table',
    providers: [EventService],
    templateUrl: './event-table.component.html',
    styleUrls: ['./event-table.component.scss']
})
export class EventTableComponent implements OnInit, OnDestroy {

    allEvents: RawEvent[] = [];
    selectedEvents: RawEvent[] = [];



    constructor(private httpService: EventService,
                private builder: FormBuilder
    ) {

    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
        this.updateTable();
    }

    updateTable() {

    }

}