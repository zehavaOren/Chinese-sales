import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { GiftComponent } from './gift/gift.component';
import { GiftService } from './services/gift.service';
import { DonatorsComponent } from './donators/donators.component';
import { DonatorService } from './services/donator.service';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RuffleComponent } from './ruffle/ruffle.component';
import { BuyingComponent } from './buying/buying.component';
import { BuyerDetailsComponent } from './buyer-details/buyer-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuyerService } from './services/buyer.service';
import { SaleComponent } from './sale/sale.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { PaymentComponent } from './payment/payment.component';
import { CardsService } from './services/cards.service';




@NgModule({
  declarations: [
    AppComponent,
    GiftComponent,
    DonatorsComponent,
    AdminComponent,
    LoginComponent,
    HomeComponent,
    RuffleComponent,
    BuyingComponent,
    BuyerDetailsComponent,
    SaleComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DropDownsModule
  ],
  providers: [GiftService,DonatorService,BuyerService,CardsService
  ],
  bootstrap: [AppComponent,GiftComponent]
})
export class AppModule { }
