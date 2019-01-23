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
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SearchComponent } from './search/search.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ChartComponent } from './chart/chart.component';

import { StockApiService } from './stock-api.service'
import { NewsApiService } from './news-api.service';
import { UserService } from './user.service';

import { ChartsModule } from 'ng2-charts';


@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        RegistrationComponent,
        LoginComponent,
        LogoutComponent,
        FavoritesComponent,
        SearchComponent,
        SideBarComponent,
        ChartComponent
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
    providers: [
        UserService,
        StockApiService,
        NewsApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
