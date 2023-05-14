import { Component, OnInit } from '@angular/core';
import { Buying } from '../models/buying.model';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  cards :Buying[]=[];

  totalPrice: number = 0;
  constructor(public cardsSrv:CardsService) { }

  ngOnInit(): void {
    this.cardsSrv.getAllCards();

    this.calcTotalCost();
  
  }


  calcTotalCost(){
    // this.cards.forEach(c => {
    //   this.totalPrice = this.totalPrice+(c.price*c.amount);
      
    // });
    
   this.totalPrice = this.cardsSrv.getTotalCost();
  }
  pay(){
   
    alert("the payment recived, thank you!");
    return;
  }

}
