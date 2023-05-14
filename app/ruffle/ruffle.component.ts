import { Component, OnInit } from '@angular/core';
import { Gift } from '../models/gift.model';
import { GiftService } from '../services/gift.service';

@Component({
  selector: 'app-ruffle',
  templateUrl: './ruffle.component.html',
  styleUrls: ['./ruffle.component.css']
})
export class RuffleComponent implements OnInit {


  gifts: Gift[] = [];




  constructor(public giftSrv: GiftService) { }

  ngOnInit(): void {
    this.giftSrv.getAllGifts().subscribe((res: Gift[]) => {
      this.giftSrv.saveList(res);
    })
  }

  ruffle(){
    this.gifts.forEach(g => {
      let win:number=Math.floor(Math.random()*g.buyers.length)
      g.winner = g.buyers[win];
    });
  }

}
