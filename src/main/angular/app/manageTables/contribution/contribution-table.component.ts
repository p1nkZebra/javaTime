import {Component, OnDestroy, OnInit} from '@angular/core';
import {finalize, tap} from "rxjs/internal/operators";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Dictionary} from "async";
import {ContributionService} from "@app/service/contribution.service";
import {RawContribution} from "@app/model/tables/rawContribution";


export interface ContributionInputs extends Dictionary<AbstractControl> {
    contributionNameInputFormControlName: AbstractControl,
    contributionFactorInputFormControlName: AbstractControl,
    contributionResourceIdInputFormControlName: AbstractControl,
}
export interface ContributionEdits extends Dictionary<AbstractControl> {
    contributionEditNameInputFormControlName: AbstractControl,
    contributionEditFactorInputFormControlName: AbstractControl,
    contributionEditResourceIdInputFormControlName: AbstractControl,
}

@Component({
    selector: 'contribution-table',
    providers: [ContributionService],
    templateUrl: './contribution-table.component.html',
    styleUrls: ['./contribution-table.component.scss']
})
export class ContributionTableComponent implements OnInit, OnDestroy {

    allContributions: RawContribution[] = [];
    selectedContributions: RawContribution[] = [];

    doOpenAddContributionModal: boolean = false;
    doOpenEditContributionModal: boolean = false;


    contributionInputFormGroup: FormGroup;
    contributionNameInputFormControl: FormControl = new FormControl();
    contributionFactorInputFormControl: FormControl = new FormControl();
    contributionResourceIdInputFormControl: FormControl = new FormControl();

    contributionEditInputFormGroup : FormGroup;
    contributionEditNameInputFormControl: FormControl = new FormControl();
    contributionEditFactorInputFormControl: FormControl = new FormControl();
    contributionEditResourceIdInputFormControl: FormControl = new FormControl();

    constructor(private httpService: ContributionService,
                private builder: FormBuilder
    ) {
        this.contributionInputFormGroup = this.builder.group({
            contributionNameInputFormControlName: this.contributionNameInputFormControl,
            contributionFactorInputFormControlName: this.contributionFactorInputFormControl,
            contributionResourceIdInputFormControlName: this.contributionResourceIdInputFormControl,
        } as ContributionInputs);
        this.contributionEditInputFormGroup=this.builder.group({
            contributionEditNameInputFormControlName: this.contributionEditNameInputFormControl,
            contributionEditFactorInputFormControlName: this.contributionEditFactorInputFormControl,
            contributionEditResourceIdInputFormControlName: this.contributionEditResourceIdInputFormControl,
        }as ContributionEdits)
    }

    ngOnInit() {

        this.updateTable();
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
        let contributionResourceId: number = inputs.contributionResourceIdInputFormControlName.value;

        if (contributionName.trim().length == 0) {
            console.log("ERROR: empty value for contributionName");
            return;
        }

        let contribution: RawContribution = new RawContribution();
        contribution.name = contributionName;
        contribution.factor = contributionFactor;
        contribution.resourceId = contributionResourceId;

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
        let contributionResourceId: number = inputs.contributionEditResourceIdInputFormControlName.value;

        console.log("before",this.selectedContributions[0]);

        let contribution: RawContribution =this.selectedContributions[0];
        contribution.name = contributionName;
        contribution.factor = contributionFactor;
        contribution.resourceId = contributionResourceId;

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
}