import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginPageComponent } from "./login-page/login-page.component";
import { AdminLayoutComponent } from "./shared/components/admin-layout/admin-layout.component";
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AuthGuard } from "../shared/services/auth.guard";
import { SearchPipe } from "../shared/search.pipe";
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from "../shared/services/alert.service";

@NgModule({
    declarations: [
        AdminLayoutComponent,
        LoginPageComponent,
        DashboardPageComponent,
        CreatePageComponent,
        EditPageComponent,
        SearchPipe,
        AlertComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([
            {path:'', component: AdminLayoutComponent, children: [
                {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
                {path: 'login', component: LoginPageComponent},
                {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
                {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
                {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]},
            ]}
        ]),
    ],
    exports: [],
    providers: [
        AuthGuard,
        AlertService
    ]
})
export class AdminModule {

}