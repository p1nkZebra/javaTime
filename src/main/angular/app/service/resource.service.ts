import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {classToPlain, plainToClass} from "class-transformer";
import {map} from "rxjs/internal/operators";
import {RawResource} from "@app/model/tables/rawResource";
import {ResourceView} from "@app/model/view/resourceView";

@Injectable()
export class ResourceService {

    constructor(private http: HttpClient) {
    }

    getResourceView(): Observable<ResourceView[]> {
        return this.http.get<ResourceView[]>("java-people/get-resource-view" )
            .pipe(
                map(response => plainToClass(ResourceView, response as Object[])
                )
            );
    }



    getResourceTable() {
        return this.http.get<RawResource[]>("java-people/get-resource-table" )
            .pipe(
                map(response => plainToClass(RawResource, response as Object[])
                )
            );
    }



    addResource(resource: RawResource) {
        return this.http.post("java-people/save-new-resource", classToPlain(resource));
    }

    editResource(resource: RawResource) {
        return this.http.post("java-people/edit-resource", classToPlain(resource));

    }
}