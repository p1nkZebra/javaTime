import {Component, OnDestroy, OnInit} from '@angular/core';
import {finalize, tap} from "rxjs/internal/operators";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Dictionary} from "async";
import {ContributionService} from "@app/service/contribution.service";
import {RawContribution} from "@app/model/tables/rawContribution";
import {RawResource} from "@app/model/tables/rawResource";
import {ResourceService} from "@app/service/resource.service";


export interface ContributionInputs extends Dictionary<AbstractControl> {
    resourceNameFcn: AbstractControl,
    nameFcn: AbstractControl,
    factorFcn: AbstractControl,
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

    resourceList: RawResource[] = [];

    doOpenAddContributionModal: boolean = false;
    doOpenEditContributionModal: boolean = false;


    inputFields: FormGroup;
    resourceNameFc: FormControl = new FormControl();
    nameFc: FormControl = new FormControl();
    factorFc: FormControl = new FormControl();

    editFields : FormGroup;
    contributionEditNameInputFormControl: FormControl = new FormControl();
    contributionEditFactorInputFormControl: FormControl = new FormControl();
    contributionEditResourceInputFormControl: FormControl = new FormControl();

    countryForm: FormGroup;
    countries = ['USA', 'Canada', 'Uk'];

    constructor(private httpService: ContributionService,
                private httpServiceResource: ResourceService,
                private builder: FormBuilder
    ) {
        this.inputFields = this.builder.group({
            nameFcn: this.nameFc,
            factorFcn: this.factorFc,
            resourceNameFcn: this.resourceNameFc,
        } as ContributionInputs);
        this.editFields=this.builder.group({
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
        let inputs = this.inputFields.controls as ContributionInputs;

        let contributionName: string = inputs.nameFcn.value;
        let contributionFactor: number = inputs.factorFcn.value;
        let resource: RawResource = inputs.resourceNameFcn.value;

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
        this.inputFields.reset();

        this.doOpenEditContributionModal = false;
        this.editFields.reset();
    }


    editContribution() {
        console.log("editContribution");

        let inputs = this.editFields.controls as ContributionEdits;
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

        let inputs = this.editFields.controls as ContributionEdits;

        inputs.contributionEditNameInputFormControlName.setValue(editSelectedRow.name);
        inputs.contributionEditFactorInputFormControlName.setValue(editSelectedRow.factor);
        inputs.contributionEditResourceInputFormControlName.setValue(editSelectedRow.resourceId);
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
                this.resourceList = response;
            },
            (error) => {
                console.log(error);
            });

    }
}