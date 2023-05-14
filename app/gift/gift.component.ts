import { Component, OnInit } from '@angular/core';
import { EditEvent, GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Gift } from '../models/gift.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GiftService } from '../services/gift.service';
import { CompositeFilterDescriptor, filterBy } from '@progress/kendo-data-query';
import { SortDescriptor, orderBy } from "@progress/kendo-data-query";
import { ActivatedRoute, Router } from '@angular/router';
import { Donator } from '../models/donator';
import { DonatorService } from '../services/donator.service';
import { Buyer } from '../models/buyer.model';
import { animationFrameScheduler } from 'rxjs';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { Buying } from '../models/buying.model';


@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit {
  
  gifts: Gift[] = [];
  donators:Donator[]=[];
  donatorsNames:string[]=[];

  formGroup: FormGroup = new FormGroup({
    id: new FormControl(Validators.required),
    name: new FormControl("", Validators.required),
    price: new FormControl(0),
    donator: new FormControl("", Validators.required)

  });

  constructor(public giftSrv: GiftService, private router: Router,private route: ActivatedRoute,public donatorSrv:DonatorService) {
   }

  ngOnInit(): void {
    this.giftSrv.getAllGifts().subscribe((res: Gift[]) => {
      this.giftSrv.saveList(res);
    })
   
    
    this.donatorSrv.getAllDonators().subscribe((res:Donator[])=>{
      this.donatorSrv.saveList(res);
    })


console.log(this.donatorSrv.donators.getValue())
this.donatorSrv.donators.getValue().forEach( d=> {
  console.log(d.name);
  this.donatorsNames.push(d.name);
})   

  //  this.donators.forEach(d=>{
  //   console.log("dfgdfgdre");
    
  //   console.log(d.name);
    
  //   this.donatorsNames.push(d.name);
  //  })
// console.log(this.donatorsNames);

  }
  
  editHandler(args: EditEvent) {

    const group = new FormGroup({
      'id': new FormControl(args.dataItem.id),
      'name': new FormControl(args.dataItem.name),
      'donator': new FormControl(args.dataItem.donator),
      'price': new FormControl(args.dataItem.price)
    });
    args.sender.editRow(args.rowIndex, group);
  }

  cancelHandler(args: EditEvent) {
    args.sender.closeRow(args.rowIndex)
   
  }

   saveHandler(args: EditEvent) {

    const newGift: Gift = new Gift();

    const group = {
      'id': new FormControl(args.dataItem.id),
      'name': new FormControl(args.dataItem.name),
      'donator': new FormControl(args.dataItem.donator),
      'price': new FormControl(args.dataItem.price)
    }
    
    
    if (args.isNew) {
      newGift.id=group.id.value;
      newGift.name=group.name.value;
      newGift.donator=group.donator.value;
      newGift.donator="dan";

      newGift.price=group.price.value;

      // newGift.id = (args.dataItem.id);
      // newGift.name = (args.dataItem.name);
      // newGift.donator=args.rowIndex.toString();
      // newGift.donator = (args.dataItem.donator);
      // console.log(newGift.donator);
      // console.log(args.dataItem.donator);
      // newGift.price = (args.dataItem.price);
      //לא צריך!
      // newGift.buyers=[];
      // const b:Buyer=new Buyer();
      // const buying: Buying[] = [];
      // const buyer: Buyer[] = [];
      // let buy:Buying=new Buying();
      // buying.push(buy);
      // b.gifts=buying;
      // newGift.buyers=buyer;
      // newGift.winner=b;
      // newGift.winner.gifts=buying;

      console.log(newGift);
      
      this.giftSrv.addGift(newGift).subscribe((res: boolean) => {
        if (res)
          this.giftSrv.getAllGifts().subscribe((res: Gift[]) =>
            this.giftSrv.saveList(res));
      });
    }
    else {
     
    
      
      // let giftForUpdate = new Gift();
      // giftForUpdate.id=this.formGroup.controls["id"].value;
      // giftForUpdate.name=this.formGroup.controls['name'].value;
      // giftForUpdate.donator=this.formGroup.controls['donator'].value;
      // giftForUpdate.price=this.formGroup.controls['price'].value;

   
      // newGift.id=group.id.value;
      // newGift.name=group.name.value;
      // newGift.donator=group.donator.value;
      // newGift.price=group.price.value;
     
      newGift.id = (args.dataItem.id);
      newGift.name = (args.dataItem.name);      
      newGift.donator = (args.dataItem.donator);
      newGift.price = (args.dataItem.price);
      newGift.buyers=[];
      const b:Buyer=new Buyer();
      const buying: Buying[] = [];
      const buyer: Buyer[] = [];

      b.gifts=buying;
      newGift.buyers=buyer;
      newGift.winner=b;
       newGift.buyers=[];
      newGift.winner=new Buyer();
 
      this.giftSrv.updateGift(newGift).subscribe((res: boolean) => {
       
        if (res)
          this.giftSrv.getAllGifts().subscribe((res: Gift[]) =>
            this.giftSrv.saveList(res));
      });

    }

  }

  removeHandler(args: EditEvent) {

    this.giftSrv.gifts.forEach(x=>{

    })
    let giftId = (args.dataItem.id);
    this.giftSrv.deleteGift(giftId).subscribe((res: boolean) => {
      if (res)
        this.giftSrv.getAllGifts().subscribe((res: Gift[]) =>
          this.giftSrv.saveList(res));
     
    });
  };



  addHandler(args: EditEvent) {

    const group = new FormGroup({
      'id': new FormControl(),
      'name': new FormControl(),
      'donator': new FormControl(),
      'price': new FormControl()

    });

    args.sender.addRow(group);
   

  }
  routDetails(args:EditEvent){
    this.router.navigate(['viewGifts/'],{relativeTo:this.route})
  }
}



