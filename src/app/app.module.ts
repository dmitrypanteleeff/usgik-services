import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TuiRootModule } from '@taiga-ui/core';
import { NgLetModule } from 'ng-let';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { OfferState } from './pages/offers/state/offers.state';
import { HttpClientModule } from '@angular/common/http';
import { TuiSelectModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiRootModule,
    NgLetModule,
    HttpClientModule,
    TuiSelectModule,
    NgxsModule.forRoot([OfferState], {
      developmentMode: false
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
