import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/internal/operators";
import {Observable} from "rxjs/Rx";
import {classToPlain, plainToClass} from "class-transformer";
import {ContributionView} from "@app/model/view/contributionView";
import {RawContribution} from "@app/model/tables/rawContribution";


@Injectable()
export class ContributionService {

    constructor(private http: HttpClient) {
    }

    getContributionView(): Observable<ContributionView[]> {
        return this.http.get<ContributionView[]>("java-people/get-contribution-view")
            .pipe(
                map(response => plainToClass(ContributionView, response as Object[])
                )
            );
    }

    getContributionTable() {
        return this.http.get<RawContribution[]>("java-people/get-contribution-table" )
            .pipe(
                map(response => plainToClass(RawContribution, response as Object[])
                )
            );
    }


    addContribution(contribution: RawContribution) {
        return this.http.post("java-people/save-contribution", classToPlain(contribution));
    }


    // loadResourceName(){
    //     return this.http.get<RawResource.name[]>()
    // }
}