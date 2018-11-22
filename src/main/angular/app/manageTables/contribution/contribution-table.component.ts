import {Component, OnDestroy, OnInit} from '@angular/core';
import {finalize, tap} from "rxjs/internal/operators";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Dictionary} from "async";
import {ContributionService} from "@app/service/contribution.service";
import {RawContribution} from "@app/model/tables/rawContribution";
import {RawResource} from "@app/model/tables/rawResource";
import {ResourceService} from "@app/service/resource.service";


export interface ContributionFields extends Dictionary<AbstractControl> {
    resourceNameFcn: AbstractControl,
    nameFcn: AbstractControl,
    factorFcn: AbstractControl,
}

@Component({
    selector: 'contribution-table',
    providers: [ContributionService, ResourceService],
    templateUrl: './contribution-table.component.html',
    styleUrls: ['./contribution-table.component.scss']
})
export class ContributionTableComponent implements OnInit, OnDestroy {

    allContributions: RawContribution[] = [];
    selectedContributions: RawContribution[] = [];

    resourceList: RawResource[] = [];

    doOpenContributionModal: boolean = false;
    modalTitle: string;

    ADD_NEW: string = "Add new Contribution";
    EDIT: string = "Edit Contribution";

    fieldsFormGroup: FormGroup;
    resourceNameFc: FormControl = new FormControl();
    nameFc: FormControl = new FormControl();
    factorFc: FormControl = new FormControl();


    constructor(private contributionHttpService: ContributionService,
                private resourceHttpService: ResourceService,
                private builder: FormBuilder
    ) {
        this.fieldsFormGroup = this.builder.group({
            nameFcn: this.nameFc,
            factorFcn: this.factorFc,
            resourceNameFcn: this.resourceNameFc,
        } as ContributionFields);
    }

    ngOnInit() {
        this.updateTable();
        this.loadResources();
    }

    ngOnDestroy() {
    }

    updateTable() {
        this.contributionHttpService.getContributionTable()
            .pipe(
                tap(() => {
                    // do something before all actions
                }),
                finalize(() => {
                    // do something after all actions
                })
            ).subscribe(
            response => {
                this.allContributions = response;
            },
            (error) => {
                console.log(error);
            });
    }

    onAdd() {
        console.log("open modal");
        this.doOpenContributionModal = true;
        this.modalTitle = this.ADD_NEW;
    }

    doEdit() {
        console.log("open modal");
        this.doOpenContributionModal = true;
        this.modalTitle = this.EDIT;

        let editSelectedRow = this.selectedContributions[0];
        let name = editSelectedRow.name;
        let factor = editSelectedRow.factor;
        let resource = this.resourceList.find(item => item.id === editSelectedRow.resourceId);

        let inputs = this.fieldsFormGroup.controls as ContributionFields;
        inputs.nameFcn.setValue(name);
        inputs.factorFcn.setValue(factor);
        inputs.resourceNameFcn.setValue(resource);
    }

    doSave() {
        console.log("save");
        let inputs = this.fieldsFormGroup.controls as ContributionFields;

        let contributionName: string = inputs.nameFcn.value;
        let contributionFactor: number = inputs.factorFcn.value;
        let resource: RawResource = inputs.resourceNameFcn.value;


        let selectedRows = this.selectedContributions;
        let contribution: RawContribution = selectedRows.length == 0 ? new RawContribution() : selectedRows[0];
        contribution.name = contributionName;
        contribution.factor = contributionFactor;
        contribution.resourceId = resource.id;

        this.contributionHttpService.addContribution(contribution)
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
        console.log("close modal");

        this.doOpenContributionModal = false;
        this.fieldsFormGroup.reset();
    }

    onDelete() {
        console.log("onDelete");
    }

//загружаем все ресурсы
    loadResources() {
        this.resourceHttpService.getResourceTable()
            .pipe(
                tap(() => {
                    // do something before all actions
                }),
                finalize(() => {
                    // do something after all actions
                })
            ).subscribe(
            response => {
                this.resourceList = response;
            },
            (error) => {
                console.log(error);
            });

    }
}