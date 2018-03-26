import { HomeComponent } from "./views/home/home.component";
import { LoginComponent } from "./views/login/login.component";
import { NotFoundComponent } from "./views/not-found/not-found.component";
import { DetailsComponent } from "./views/details/details.component";
import { AddPoolComponent } from "./views/add-pool/add-pool.component";
import { AuthGuardService } from "./auth/services/auth-guard.service";

export const routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "home", component: HomeComponent, canActivate: [AuthGuardService] },
    { path: "add-pool", component: AddPoolComponent, canActivate: [AuthGuardService] },
    { path: "details/:id", component: DetailsComponent, canActivate: [AuthGuardService] },
    { path: "**", component: NotFoundComponent },
];
