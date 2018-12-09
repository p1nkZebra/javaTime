import {Component, OnDestroy, OnInit} from '@angular/core';
import {ResourceService} from "@app/service/resource.service";
import {finalize, tap} from "rxjs/internal/operators";
import {ResourceView} from "@app/model/view/resourceView";

@Component({
    selector: 'resource-view',
    providers: [ResourceService],
    templateUrl: './resource-view.component.html',
    styleUrls: ['./resource-view.component.scss']
})
export class ResourceViewComponent implements OnInit, OnDestroy {

    allResourceView: ResourceView[] = [];


    constructor(private httpService: ResourceService) {
    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
        this.updateTable();
    }

    updateTable() {
        this.httpService.getResourceView()
            .pipe(
                tap(() => {
                    // do something before all actions
                }),
                finalize(() => {
                    // do something after all actions
                })
            ).subscribe(
                response => {
                    this.allResourceView = response;
                },
                (error) => {
                    console.log(error);
                });
    }
    
}