import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {classToPlain, plainToClass} from "class-transformer";
import {catchError, map} from "rxjs/internal/operators";
import {EventView} from "@app/model/view/eventView";
import {RawEvent} from "@app/model/tables/rawEvent";

@Injectable()
export class EventService {

    constructor(private http: HttpClient) {
    }


    getEventView(): Observable<EventView[]> {
        return this.http.get<EventView[]>("java-people/get-event-view")
            .pipe(
                map(response => plainToClass(EventView, response as Object[])
                )
            );
    }


    deleteSelectedEvents(events: RawEvent[])  {
        return this.http.post("java-people/delete-events", classToPlain(events));
    }


    getFilteredEventView(dateFrom: string, dateTo: string, status: string, searchString: string): Observable<EventView[]> {

        let httpParams: HttpParams = new HttpParams();
        httpParams = httpParams.append('dateFrom', dateFrom);
        httpParams = httpParams.append('dateTo', dateTo);
        httpParams = httpParams.append('status', status);
        if (searchString !== null && searchString.trim().length > 0) {
        httpParams = httpParams.append('searchString', searchString);
        }

        return this.http.get<EventView[]>("java-people/get-filtered-event-view", {params: httpParams} )
            .pipe(
                map(response => plainToClass(EventView, response as Object[])
                )
            );
    }

    getEventTable(): Observable<RawEvent[]>  {
        let operation: string = 'getEventTable';
        let url: string = "java-people/get-event-table";

        return this.http.get<RawEvent[]>(url)
            .pipe(
                map(response => plainToClass(RawEvent, response as Object[])),
                catchError(this.handleError(operation, url))
            );
    }

    addEvent(event: RawEvent) {
        console.log(event);
        console.log(classToPlain(event));
        return this.http.post("java-people/save-event", classToPlain(event));
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