import {Component, OnDestroy, OnInit} from '@angular/core';
import {finalize, tap} from "rxjs/internal/operators";
import {EventService} from "@app/service/event.service";
import {EventView} from "@app/model/view/eventView";

@Component({
    selector: 'event-view',
    providers: [EventService],
    templateUrl: './event-view.component.html',
    styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit, OnDestroy {
    
    allEventView: EventView[] = [];
    


    constructor(private eventHttpService: EventService) {
    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
        this.updateTable();
    }
    

    updateTable() {
        this.eventHttpService.getEventView()
            .pipe(
                tap(() => {
                    // do something before all actions
                }),
                finalize(() => {
                    // do something after all actions
                })
            ).subscribe(
            response => {
                this.allEventView = response;
            },
            (error) => {
                console.log(error);
            });
    }
    
}