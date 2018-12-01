import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map} from "rxjs/internal/operators";
import {Observable} from "rxjs/Rx";
import {classToPlain, plainToClass} from "class-transformer";
import {ContributionView} from "@app/model/view/contributionView";
import {RawContribution} from "@app/model/tables/rawContribution";


@Injectable()
export class ContributionService {

    constructor(private http: HttpClient) {
    }

    getContributionView(): Observable<ContributionView[]> {
        let operation: string = 'getContributionView';
        let url: string = "java-people/get-contribution-view";

        return this.http.get<ContributionView[]>(url)
            .pipe(
                map(response => plainToClass(ContributionView, response as Object[])),
                catchError(this.handleError(operation, url))
            );
    }

    getContributionTable(): Observable<RawContribution[]>  {
        let operation: string = 'getContributionTable';
        let url: string = "java-people/get-contribution-table";

        return this.http.get<RawContribution[]>(url )
            .pipe(
                map(response => plainToClass(RawContribution, response as Object[])),
                catchError(this.handleError(operation, url))
            );
    }

    addContribution(contribution: RawContribution) {
        return this.http.post("java-people/save-contribution", classToPlain(contribution));
    }

    private handleError(operation: String, url: string) {
        return (err: any) => {
            let errMsg = `error in ${operation}() retrieving ${url}`;
            console.log(`${errMsg}:`, err);

            if(err instanceof HttpErrorResponse) {
                // you could extract more info about the error if you want, e.g.:
                console.log(`status: ${err.status}, ${err.statusText}`);
                // errMsg = ...
            }
            return Observable.throwError(errMsg);
        }
    }
}