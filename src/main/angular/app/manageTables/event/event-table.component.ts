import {Component, OnDestroy, OnInit} from '@angular/core';
import {RawEvent} from "app/model/tables/rawEvent";
import {EventService} from "app/service/event.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {finalize, tap} from "rxjs/operators";
import {error} from "selenium-webdriver";
import {Dictionary} from "async";

export interface EventInputs extends Dictionary<AbstractControl>{
    eventNameInputFormControlName: AbstractControl;
    eventCommentInputFormControlName: AbstractControl;
    // eventUserValueInputFormControlName : AbstractControl;
}

@Component({
    selector: 'event-table',
    providers: [EventService],
    templateUrl: './event-table.component.html',
    styleUrls: ['./event-table.component.scss']
})
export class EventTableComponent implements OnInit, OnDestroy {

    allEvents: RawEvent[] = [];
    selectedEvents: RawEvent[] = [];

    doOpenAddEventModal:boolean = false;
    eventInputFormGroup: FormGroup;
    eventNameInputFormControl: FormControl = new FormControl();
    eventCommentInputFormControl: FormControl = new FormControl();
    // eventUserValueInputFormControl:FormControl = new FormControl();



    constructor(private httpService: EventService,private builder: FormBuilder){
        this.eventInputFormGroup = this.builder.group({
            eventNameInputFormControlName: this.eventNameInputFormControl,
            eventCommentInputFormControlName:this.eventNameInputFormControl,
        }as EventInputs);
    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
        this.updateTable();
    }


    downloadContributionId(){
        this.httpService.getContributionId().pipe(tap( () =>{}),
                                                  finalize(() =>{})
            ).subscribe()


    }


    updateTable() {
this.httpService.getEventTable()
        .pipe(

            tap(() =>{

            }),
            finalize(() => {

            })

        ).subscribe(
        response => {
                this.allEvents = response;
        },
        (error) =>{
                console.log(error);
        });
    }

    saveNewEvent(){
        console.log("saveNewEvent");

        let inputs = this.eventInputFormGroup.controls as EventInputs;

        let eventName: string = inputs.eventNameInputFormControlName.value;
        let eventComment: string = inputs.eventCommentInputFormControlName.value;
        // let eventUserValue:number = inputs.eventUserValueInputFormControlName.value;

        if (eventName.trim().length == 0){
            console.log("ERROR: empty value for eventName");
            return;
        }

        let event : RawEvent = new RawEvent();
        event.name = eventName;
        event.comment = eventComment;
        // event.userValue = eventUserValue;

        this.httpService.addNewEvent(event).pipe(tap(() =>{}),
                                                 finalize( () => {
                                                     this.closeModal();
                                                     this.updateTable();
                                                 })).subscribe()
    }

    closeModal(){
        console.log("close modal");
        // добавление
        this.doOpenAddEventModal = false;
        this.eventInputFormGroup.reset();
    }
    onAddEvent(){
        console.log("open modal window in bookmark Event")
        this.doOpenAddEventModal = true;
    }
    onDeleteEvent(){}

    onEditEvent(){}

}