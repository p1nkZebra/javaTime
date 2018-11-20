import {Component, OnDestroy, OnInit} from '@angular/core';
import {finalize, tap} from "rxjs/internal/operators";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Dictionary} from "async";
import {ContributionService} from "@app/service/contribution.service";
import {RawContribution} from "@app/model/tables/rawContribution";
import {RawResource} from "@app/model/tables/rawResource";
import {ResourceService} from "@app/service/resource.service";


export interface ContributionInputs extends Dictionary<AbstractControl> {
    contributionNameInputFormControlName: AbstractControl,
    contributionFactorInputFormControlName: AbstractControl,
    contributionResourceInputFormControlName: AbstractControl,
}
export interface ContributionEdits extends Dictionary<AbstractControl> {
    contributionEditNameInputFormControlName: AbstractControl,
    contributionEditFactorInputFormControlName: AbstractControl,
    contributionEditResourceInputFormControlName: AbstractControl,
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

    allResources: RawResource[] = [];

    doOpenAddContributionModal: boolean = false;
    doOpenEditContributionModal: boolean = false;


    contributionInputFormGroup: FormGroup;
    contributionNameInputFormControl: FormControl = new FormControl();
    contributionFactorInputFormControl: FormControl = new FormControl();
    contributionResourceInputFormControl: FormControl = new FormControl();

    contributionEditInputFormGroup : FormGroup;
    contributionEditNameInputFormControl: FormControl = new FormControl();
    contributionEditFactorInputFormControl: FormControl = new FormControl();
    contributionEditResourceInputFormControl: FormControl = new FormControl();

    countryForm: FormGroup;
    countries = ['USA', 'Canada', 'Uk'];

    constructor(private httpService: ContributionService,
                private httpServiceResource: ResourceService,
                private builder: FormBuilder
    ) {
        this.contributionInputFormGroup = this.builder.group({
            contributionNameInputFormControlName: this.contributionNameInputFormControl,
            contributionFactorInputFormControlName: this.contributionFactorInputFormControl,
            contributionResourceInputFormControlName: this.contributionResourceInputFormControl,
        } as ContributionInputs);
        this.contributionEditInputFormGroup=this.builder.group({
            contributionEditNameInputFormControlName: this.contributionEditNameInputFormControl,
            contributionEditFactorInputFormControlName: this.contributionEditFactorInputFormControl,
            contributionEditResourceInputFormControlName: this.contributionEditResourceInputFormControl,
        }as ContributionEdits)
    }

    ngOnInit() {
        this.updateTable();
        this.loadResources();

        this.countryForm = this.builder.group({countryControl: [this.countries[1]]});
    }

    ngOnDestroy() {
    }

    updateTable() {
        this.httpService.getContributionTable()
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
        console.log("open modal window");
        this.doOpenAddContributionModal = true;

    }


    saveNewContribution() {
        console.log("saveNewContribution");

        let inputs = this.contributionInputFormGroup.controls as ContributionInputs;

        let contributionName: string = inputs.contributionNameInputFormControlName.value;
        let contributionFactor: number = inputs.contributionFactorInputFormControlName.value;
        let resource: RawResource = inputs.contributionResourceInputFormControlName.value;

        if (contributionName.trim().length == 0) {
            console.log("ERROR: empty value for contributionName");
            return;
        }

        let contribution: RawContribution = new RawContribution();
        contribution.name = contributionName;
        contribution.factor = contributionFactor;
        contribution.resourceId = resource.id;

        this.httpService.addNewContribution(contribution)
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

        this.doOpenAddContributionModal = false;
        this.contributionInputFormGroup.reset();

        this.doOpenEditContributionModal = false;
        this.contributionEditInputFormGroup.reset();

    }


    editContribution() {
        console.log("editContribution");

        let inputs = this.contributionEditInputFormGroup.controls as ContributionEdits;
        let contributionName: string = inputs.contributionEditNameInputFormControlName.value;
        let contributionFactor: number = inputs.contributionEditFactorInputFormControlName.value;
        let resource: RawResource = inputs.contributionEditResourceInputFormControlName.value;

        console.log("before",this.selectedContributions[0]);

        let contribution: RawContribution =this.selectedContributions[0];
        contribution.name = contributionName;
        contribution.factor = contributionFactor;
        contribution.resourceId = resource.id;


        this.httpService.editContribution(contribution)
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

    doEdit() {
        this.doOpenEditContributionModal = true;
        let editSelectedRow=this.selectedContributions[0];

        let inputs = this.contributionEditInputFormGroup.controls as ContributionEdits;

        inputs.contributionEditNameInputFormControlName.setValue(editSelectedRow.name);
        inputs.contributionEditFactorInputFormControlName.setValue(editSelectedRow.factor);
        inputs.contributionEditResourceIdInputFormControlName.setValue(editSelectedRow.resourceId);
    }

    onDelete() {
        console.log("onDelete");
    }
//загружаем все ресурсы
    loadResources(){
        this.httpServiceResource.getResourceTable()
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
}