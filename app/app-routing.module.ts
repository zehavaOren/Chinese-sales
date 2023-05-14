import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BuyingComponent } from './buying/buying.component';
import { DonatorsComponent } from './donators/donators.component';
import { HomeComponent } from './home/home.component';
import { RuffleComponent } from './ruffle/ruffle.component';
import { GiftComponent } from './gift/gift.component'
import { BuyerDetailsComponent } from './buyer-details/buyer-details.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [

  {
    path: '', component: HomeComponent,
    children: [
      // { path:'buying', component: BuyingComponent},
      {
        path: 'buyerDetails', component: BuyerDetailsComponent,
        children: [
          {
            path: 'buying', component: BuyingComponent,
             children: [
              { path: 'payment', component: PaymentComponent }
            ]
          }]
      }
    ]
  },
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: 'gift', component: GiftComponent },
      { path: 'donators', component: DonatorsComponent },
      { path: 'ruffle', component: RuffleComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
