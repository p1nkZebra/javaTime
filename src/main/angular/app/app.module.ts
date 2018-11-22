import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {ClarityModule, ClrFormsNextModule, ClrInputModule, ClrSelectModule} from "@clr/angular";
import {AppComponent} from './app.component';
import {ROUTING} from "./app.routing";

import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {ResourceViewComponent} from "@app/view/resourse/resource-view.component";
import {EventViewComponent} from "@app/view/event/event-view.component";
import {ResourceTableComponent} from "@app/manageTables/resource/resource-table.component";
import {ContributionTableComponent} from "@app/manageTables/contribution/contribution-table.component";
import {EventTableComponent} from "@app/manageTables/event/event-table.component";
import {ContributionViewComponent} from "@app/view/contribution/contribution-view.component";

registerLocaleData(localeRu);

@NgModule({
    declarations: [
        AppComponent,

        ResourceViewComponent,
        ContributionViewComponent,
        EventViewComponent,

        ResourceTableComponent,
        ContributionTableComponent,
        EventTableComponent,



        // ClrInputContainer,


    ],

    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ClarityModule,
        ClrInputModule,
        ClrSelectModule,
        ClrFormsNextModule,
        ROUTING
    ],
    providers: [
        // {provide: LOCALE_ID, useValue: 'ru'},
        // {provide: HTTP_INTERCEPTORS, useClass: ConfigurationInterceptor, multi: true},
        // {provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true},
        // {provide: HTTP_INTERCEPTORS, useClass: BlobErrorHttpInterceptor, multi: true},
        // {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
