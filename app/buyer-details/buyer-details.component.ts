import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Buyer } from '../models/buyer.model';
import { Buying } from '../models/buying.model';
import { BuyerService } from '../services/buyer.service';

@Component({
  selector: 'app-buyer-details',
  templateUrl: './buyer-details.component.html',
  styleUrls: ['./buyer-details.component.css']
})
export class BuyerDetailsComponent implements OnInit {
  id:number=0;
  frmBuyerDetails: FormGroup = new FormGroup({
    'name': new FormControl('', [Validators.maxLength(30)]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'phone': new FormControl('', [Validators.maxLength(10), Validators.minLength(9)])

  })

  constructor(public buyerSrv: BuyerService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

 save() {
    let newBuyer: Buyer = new Buyer();
    newBuyer.id=this.id++;
    newBuyer.name = this.frmBuyerDetails.controls['name'].value;
    newBuyer.email = this.frmBuyerDetails.controls['email'].value;
    newBuyer.phone = this.frmBuyerDetails.controls['phone'].value;
    let buyings:Buying[]=[new Buying()];
    newBuyer.gifts=buyings;

    this.addBuyerToSessionStorage(newBuyer);

  }

  addBuyerToSessionStorage(buyer: Buyer) {
    
    sessionStorage.setItem("current_buyer", JSON.stringify(buyer));
  }

  rout(){
    this.router.navigate(['buying'], {relativeTo:this.route});
  }

}
