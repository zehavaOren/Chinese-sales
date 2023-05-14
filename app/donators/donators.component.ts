import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditEvent } from '@progress/kendo-angular-grid';
import { Donator } from '../models/donator';
import { DonatorService } from '../services/donator.service';

@Component({
  selector: 'app-donators',
  templateUrl: './donators.component.html',
  styleUrls: ['./donators.component.css']
})
export class DonatorsComponent implements OnInit {

  donatorList: Donator[] = [];


  donatorFrm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(""),
    email: new FormControl(),
    phone: new FormControl(""),
    category: new FormControl()

  });


  constructor(public donatorSrv: DonatorService, private router: Router,private route: ActivatedRoute) {  }
 

  ngOnInit(): void {
    this.donatorSrv.getAllDonators().subscribe((res: Donator[]) => {
      this.donatorSrv.saveList(res);
    })
  }

  editHandler(args: EditEvent) {

    const donatorGroup = new FormGroup({
      'id': new FormControl(args.dataItem.id),
      'name': new FormControl(args.dataItem.name),
      'email': new FormControl(args.dataItem.email),
      'phone': new FormControl(args.dataItem.phone),
      'category': new FormControl(args.dataItem.category)
    });
    args.sender.editRow(args.rowIndex, donatorGroup);
  }

  cancelHandler(args: EditEvent) {
    args.sender.closeRow(args.rowIndex)
   
  }

  saveHandler(args: EditEvent) {

    const newDonator: Donator = new Donator();

    if (args.isNew) {
      
      newDonator.id = (args.dataItem.id);
      newDonator.name = (args.dataItem.name);
      newDonator.email = (args.dataItem.email);
      newDonator.phone = (args.dataItem.phone);
      

      this.donatorSrv.addDonator(newDonator).subscribe((res: boolean) => {
        if (res)
          this.donatorSrv.getAllDonators().subscribe((res: Donator[]) =>
            this.donatorSrv.saveList(res));
      });
    }
    else {      
      newDonator.id = (args.dataItem.id);
      newDonator.name = (args.dataItem.name);
      newDonator.email = (args.dataItem.email);
      newDonator.phone = (args.dataItem.phone);

      this.donatorSrv.updateDonator(newDonator).subscribe((res: boolean) => {
        if (res)
          this.donatorSrv.getAllDonators().subscribe((res: Donator[]) =>
            this.donatorSrv.saveList(res));
      });

    }

  }

  removeHandler(args: EditEvent) {
   
    let donatorId = (args.dataItem.id);
    this.donatorSrv.deleteDonator(donatorId).subscribe((res: boolean) => {
      if (res)
        this.donatorSrv.getAllDonators().subscribe((res: Donator[]) =>
          this.donatorSrv.saveList(res));
      
    });
  };

  addHandler(args: EditEvent) {

    const group = new FormGroup({
      'id': new FormControl(),
      'name': new FormControl(),
      'email': new FormControl(),
      'phone': new FormControl(),
    });

    args.sender.addRow(group);

  }


}

