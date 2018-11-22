import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {EventViewComponent} from "@app/view/event/event-view.component";
import {ResourceTableComponent} from "@app/manageTables/resource/resource-table.component";
import {ContributionTableComponent} from "@app/manageTables/contribution/contribution-table.component";
import {ResourceViewComponent} from "@app/view/resourse/resource-view.component";
import {ContributionViewComponent} from "@app/view/contribution/contribution-view.component";
import {EventTableComponent} from "@app/manageTables/event/event-table.component";


export const ROUTES: Routes = [
    {path: '', redirectTo: 'resources-view', pathMatch: 'full'},
    {path: 'resource-table', component: ResourceTableComponent},
    {path: 'contribution-table', component: ContributionTableComponent},
    {path: 'event-table', component: EventTableComponent},
    {path: 'resources-view', component: ResourceViewComponent},
    {path: 'contributions-view', component: ContributionViewComponent},
    {path: 'events-view', component: EventViewComponent},

    // {
    //     path: 'admin', component: AdminComponent, canActivate: [AuthGuard, RoleGuard],
    //     data: {expectedRoles: [Role.ADMIN]}
    // },
    // {path: '**', component: NotFoundPageComponent}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
