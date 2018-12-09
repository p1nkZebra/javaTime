import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, finalize, tap} from "rxjs/internal/operators";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Dictionary} from "async";
import {ContributionService} from "@app/service/contribution.service";
import {RawContribution} from "@app/model/tables/rawContribution";
import {RawResource} from "@app/model/tables/rawResource";
import {ResourceService} from "@app/service/resource.service";


export interface ContributionFields extends Dictionary<AbstractControl> {
    resourceNameControl: AbstractControl,
    nameControl: AbstractControl,
    factorControl: AbstractControl,
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
    TITLE_ADD_NEW: string = "Add new Contribution";
    TITLE_EDIT: string = "Edit Contribution";

    fieldsFormGroup: FormGroup;


    constructor(private contributionHttpService: ContributionService,
                private resourceHttpService: ResourceService,
                private builder: FormBuilder) {
    }

    ngOnInit() {
        this.fieldsFormGroup = this.builder.group({
            resourceNameControl: new FormControl(),
            nameControl: new FormControl(),
            factorControl: new FormControl(),
        } as ContributionFields);

        this.updateTable();
        this.loadResources();
    }

    ngOnDestroy() {
    }

    updateTable() {
        this.contributionHttpService.getContributionTable()
            .pipe(
                filter((data) => {
                    console.log("pipe filter - 1. data = ", data);
                    console.log("pipe filter - 1. this.allContributions = ", this.allContributions);
                    return true;
                }),
                tap((afterFilter) => {
                        console.log("pipe tap next - 2. afterFilter = ", afterFilter);
                        console.log("pipe tap next - 2. this.allContributions = ", this.allContributions);
                    },
                    () => {
                        console.log("pipe: tap error ");
                    },
                    () => {
                        console.log("pipe tap complete - 4. this.allContributions = ", this.allContributions);
                    }
                ),
                finalize(() => {
                    console.log("pipe finalize - 6. this.allContributions = ", this.allContributions);
                    // do something after all actions
                })
            ).subscribe(
            (data: RawContribution[]) => {
                console.log("subscribe: next - 3. data = ", data);
                console.log("subscribe: next - 3. this.allContributions = ", this.allContributions);
                this.allContributions = data;
            },
            (error) => {
                console.log("subscribe: error");
            },
            () => {
                console.log("subscribe: complete - 5. this.allContributions = ", this.allContributions);

            })
        ;
    }

    onAdd() {
        this.doOpenContributionModal = true;
        this.modalTitle = this.TITLE_ADD_NEW;
    }

    onEdit() {
        this.doOpenContributionModal = true;
        this.modalTitle = this.TITLE_EDIT;

        let selectedRow = this.selectedContributions[0];
        let resource = this.resourceList.find(item => item.id === selectedRow.resourceId);

        let inputs = this.fieldsFormGroup.controls as ContributionFields;
        inputs.nameControl.setValue(selectedRow.name);
        inputs.factorControl.setValue(selectedRow.factor);
        inputs.resourceNameControl.setValue(resource);
    }

    save() {
        let inputs = this.fieldsFormGroup.controls as ContributionFields;
        let resource: RawResource = inputs.resourceNameControl.value;

        let selectedRows = this.selectedContributions;
        let contribution: RawContribution = selectedRows.length == 0 ? new RawContribution() : selectedRows[0];
        contribution.name = inputs.nameControl.value;
        contribution.factor = inputs.factorControl.value;
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