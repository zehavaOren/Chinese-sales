import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditEvent } from '@progress/kendo-angular-grid';
import { Buyer } from '../models/buyer.model';
import { Buying } from '../models/buying.model';
import { Gift } from '../models/gift.model';
import { BuyerService } from '../services/buyer.service';
import { CardsService } from '../services/cards.service';
import { GiftService } from '../services/gift.service';

@Component({
  selector: 'app-buying',
  templateUrl: './buying.component.html',
  styleUrls: ['./buying.component.css']
})
export class BuyingComponent implements OnInit {

  gifts: Gift[] = [];
  cards :Buying[]=[];
  sum:number=0;


  formGroup: FormGroup = new FormGroup({
    cards: new FormControl(),

  })

  constructor(public giftSrv: GiftService, public buyerSrv: BuyerService,private router: Router,private route: ActivatedRoute, public cardsSrv:CardsService) { }

  ngOnInit(): void {
    this.giftSrv.getAllGifts().subscribe((res: Gift[]) => {
      this.giftSrv.saveList(res);
    })

  }


  editHandler(args: EditEvent) {

    this.saveHandler(args);
    // const group = new FormGroup({
    //   'cards': new FormControl(args.dataItem.cards)
    // });
    // args.sender.editRow(args.rowIndex, group);
  }

  // cancelHandler(args: EditEvent) {
  //   args.sender.closeRow(args.rowIndex)

  // }

  saveHandler(args: EditEvent) {

    
    //שליפת נתונים
    let cards = 1;
    const giftID = args.dataItem.id;
    const giftPrice = args.dataItem.price;
    const giftName = args.dataItem.name;
    const buyerJsn = sessionStorage.getItem("current_buyer");
    let buyerObj;
    if (buyerJsn != null) {
       buyerObj = JSON.parse(buyerJsn);
    }
    let goodBuyer:Buyer=new Buyer()
    goodBuyer=buyerObj;
    
    //הוספה למערך הרכישות של הקורנט בייר את המתנה
    let newBuying: Buying = new Buying();
    newBuying.amount = cards;
    newBuying.gift = giftName;
    newBuying.price=giftPrice;
    this.cardsSrv.cards.push(newBuying);

    //הוספה למערך המתנות את הרוכש כמספר כמות הכרטיסים
    //אתחול האוביקט
    let j = 0;
    let newb: Buying = new Buying();
    let currentbuying: Buying []= [newb];
    let currentbuyer: Buyer = new Buyer();
    currentbuyer.gifts=currentbuying;
    let currentbuyings: Buyer []= [currentbuyer];
    currentbuyings[0].gifts=currentbuying;
    let currentGift: Gift = new Gift();
    currentGift.winner.gifts=currentbuying;
    currentGift.buyers=currentbuyings;

    this.cards.forEach(c=>{
    this.giftSrv.gifts.forEach(e => {
      if (e[j].id == giftID) {
        currentGift = e[j];
        currentGift.buyers.push(goodBuyer);
        console.log(currentGift.buyers);
        
      }
    })
  });
    
    // while (cards >= 0) {
    //   if(goodBuyer!=null){
    //   currentGift.buyers.push(goodBuyer);
    //   cards = cards - 1;
    //   }
    // }
    // this.sum=cards*giftPrice;

    const newGift: Gift = new Gift();


    newGift.id = (args.dataItem.id);
    newGift.name = (args.dataItem.name);
    newGift.donator = (args.dataItem.donator);
    newGift.price = (args.dataItem.price);


    this.giftSrv.updateGift(newGift).subscribe((res: boolean) => {

      if (res)
        this.giftSrv.getAllGifts().subscribe((res: Gift[]) =>
          this.giftSrv.saveList(res));
    });
    args.sender.closeRow(args.rowIndex);

  }

}




