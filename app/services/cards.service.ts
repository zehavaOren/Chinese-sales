import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Buying } from '../models/buying.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  // cards: BehaviorSubject<Buying[]> = new BehaviorSubject([new Buying]);
  cards: Buying[] = [];

  totalCost: number = 0; 

  constructor() { }
//   saveList(card: Buying[]){
//     this.cards.next(card);

  
// }



// addCard(card: Buying) {
//   this.cards.push(card);
// }

getAllCards(){
  return this.cards;
}

getTotalCost(){
  this.cards.forEach(c => {
    this.totalCost=this.totalCost+c.price;
  })
  return this.totalCost;
}

}

