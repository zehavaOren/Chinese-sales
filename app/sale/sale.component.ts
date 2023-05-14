import { Component, OnInit } from '@angular/core';
import { EditEvent, GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Gift } from '../models/gift.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GiftService } from '../services/gift.service';
import { SortDescriptor, orderBy } from "@progress/kendo-data-query";
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
//here!!!!!!

listItems:string[]=["aaaaa","bbbbb","ccccc","ddddd"];
  gifts: Gift[] = [];

  formGroup: FormGroup = new FormGroup({
    id: new FormControl(Validators.required),
    name: new FormControl("", Validators.required),
    price: new FormControl(0),
    donator: new FormControl("", Validators.required)

  });
  public gridView: GridDataResult | undefined;
  public pageSize = 5;
  public skip = 0;
//sorting
public sort: SortDescriptor[] = [
  {
    field: "name",
    dir: "asc",
  },
];
  constructor(public giftSrv: GiftService, private router: Router,private route: ActivatedRoute) {
    this.loadItems();
   }

  ngOnInit(): void {

    this.giftSrv.getAllGifts().subscribe((res: Gift[]) => {
      this.giftSrv.saveList(res);
      
    })
   

  }
  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadProducts();
  }
//sorting
  private loadProducts(): void {
    this.gridView = {
      data: orderBy(this.gifts, this.sort),
      total: this.gifts.length,
    };
  }
//pages
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }
//pages
  private loadItems(): void {
    this.gridView = {
      data: this.gifts.slice(this.skip, this.skip + this.pageSize),
      total: this.gifts.length,
    };
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

    // const group = {
    //   'id': new FormControl(args.dataItem.id),
    //   'name': new FormControl(args.dataItem.name),
    //   'donator': new FormControl(args.dataItem.donator),
    //   'price': new FormControl(args.dataItem.price)
    // }
    // alert(args.isNew);
    
    if (args.isNew) {
      
      newGift.id = (args.dataItem.id);
      newGift.name = (args.dataItem.name);
      newGift.donator = (args.dataItem.donator);
      newGift.price = (args.dataItem.price);
      
      this.giftSrv.addGift(newGift).subscribe((res: boolean) => {
        if (res)
          this.giftSrv.getAllGifts().subscribe((res: Gift[]) =>
            this.giftSrv.saveList(res));
      });
    }
    else {
      console.log("gift for update");
     
      
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
      
      alert( newGift.id);
      console.log(newGift);
      this.giftSrv.updateGift(newGift).subscribe((res: boolean) => {
        alert(res);
        if (res)
          this.giftSrv.getAllGifts().subscribe((res: Gift[]) =>
            this.giftSrv.saveList(res));
      });

    }

    //  sender.closeRow(rowIndex);
  }

  removeHandler(args: EditEvent) {

    alert("in delet");
    this.giftSrv.gifts.forEach(x=>{
      console.log(x.values);
      
      // if(x.values==args.dataItem.id){

      // }
    })
    let giftId = (args.dataItem.id);
    this.giftSrv.deleteGift(giftId).subscribe((res: boolean) => {
      if (res)
        this.giftSrv.getAllGifts().subscribe((res: Gift[]) =>
          this.giftSrv.saveList(res));
      alert(res)
    });
  };

  //this.editService.remove(args.dataItem);

  addHandler(args: EditEvent) {

    console.log("in add hendler")

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



