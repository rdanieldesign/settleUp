import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { DetailsComponent } from "./details/details.component";
import { AuthGuardService } from "./auth/services/auth-guard.service";

export const routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "home", component: HomeComponent, canActivate: [AuthGuardService] },
    { path: "details/:id", component: DetailsComponent, canActivate: [AuthGuardService] },
    { path: "**", component: NotFoundComponent },
];