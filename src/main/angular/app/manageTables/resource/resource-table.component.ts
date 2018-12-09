import {Component, OnDestroy, OnInit} from '@angular/core';
import {ResourceService} from "@app/service/resource.service";
import {finalize, tap} from "rxjs/internal/operators";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Dictionary} from "async";
import {RawResource} from "@app/model/tables/rawResource";

export interface ResourceFields extends Dictionary<AbstractControl> {
    nameControl: AbstractControl,
    commentControl: AbstractControl,
}

@Component({
    selector: 'resource-table',
    providers: [ResourceService],
    templateUrl: './resource-table.component.html',
    styleUrls: ['./resource-table.component.scss']
})
export class ResourceTableComponent implements OnInit, OnDestroy {

    allResources: RawResource[] = [];
    selectedResources: RawResource[] = [];

    doOpenResourceModal: boolean = false;
    modalTitle: string;
    TITLE_ADD_NEW: string = "Add new Resource";
    TITLE_EDIT: string = "Edit Resource";

    fieldsFormGroup: FormGroup;


    constructor(private httpService: ResourceService,
                private builder: FormBuilder) {
    }

    ngOnInit() {
        this.fieldsFormGroup = this.builder.group({
            nameControl: new FormControl(),
            commentControl: new FormControl(),
        } as ResourceFields);

        this.updateTable();
    }

    ngOnDestroy() {

    }

    updateTable() {
        this.httpService.getResourceTable()
            .pipe(
                tap(() => {
                    // do something before all actions
                }),
                finalize(() => {
                    // do something after all actions
                })
            ).subscribe(
            response => {
                this.allResources = response;
            },
            (error) => {
                console.log(error);
            });
    }

    onAdd() {
        console.log("open modal");
        this.doOpenResourceModal = true;
        this.modalTitle = this.TITLE_ADD_NEW;
    }

    onEdit() {
        console.log("open modal");
        this.doOpenResourceModal = true;
        this.modalTitle = this.TITLE_EDIT;

        let selectedRow = this.selectedResources[0];

        let inputs = this.fieldsFormGroup.controls as ResourceFields;
        inputs.nameControl.setValue(selectedRow.name);
        inputs.commentControl.setValue(selectedRow.comment);
    }

    onSave() {
        let inputs = this.fieldsFormGroup.controls as ResourceFields;

        let resource: RawResource = new RawResource();
        resource.name = inputs.nameControl.value;
        resource.comment = inputs.commentControl.value;

        this.httpService.addResource(resource)
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
}