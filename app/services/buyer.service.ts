import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Buyer } from '../models/buyer.model';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  buyers: BehaviorSubject<Buyer[]> = new BehaviorSubject([new Buyer]);

  constructor(private http:HttpClient) { }

  public getAllBuyers()  :Observable<Buyer[]> {
    let url = "api/buyer/getallbuyers";
    return this.http.get<Buyer[]>(url);
  }


  saveList(buyers: Buyer[]){
    this.buyers.next(buyers);
}


  public addBuyer(buyer:Buyer) : Observable<boolean>{
   let url="api/buyer/AddBuyer";
   
    return this.http.post<boolean>(url,buyer);
  }

  public updateBuyer(buyer:Buyer):Observable<boolean>{
    let url="api/buyer/updatebuyer/";
    return this.http.put<boolean>(url,buyer);
  }


}
