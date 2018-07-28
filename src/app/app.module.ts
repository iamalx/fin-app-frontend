import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routing";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { RegistrationComponent } from './registration/registration.component';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { StockApiService } from './stock-api.service'
import { ChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        RegistrationComponent,
        LoginComponent,
        LogoutComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ClarityModule,
        ROUTING,
        ChartsModule
    ],
    providers: [UserService,
    StockApiService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
