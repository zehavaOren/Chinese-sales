import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, pipe } from 'rxjs';
import { Gift } from '../models/gift.model';
import { HttpClient } from "@angular/common/http";


@Injectable()
export class GiftService {


 gifts: BehaviorSubject<Gift[]> = new BehaviorSubject([new Gift]);
 
  constructor(private http:HttpClient) { }


  public getAllGifts()  : Observable<Gift[]> {
    const url = "api/gifts/getallgifts";
    return this.http.get<Gift[]>(url);
  }


  saveList(gifts: Gift[]){
    this.gifts.next(gifts);
}


  public addGift(gift:Gift) : Observable<boolean>{
   let url="api/gifts/addgift";
    return this.http.post<boolean>(url,gift);
  }

  public updateGift(gift:Gift):Observable<boolean>{
    let url="api/gifts/updategift";
    return this.http.put<boolean>(url,gift);
  }

  public deleteGift (id: number) : Observable<boolean>{
    let url = "api/gifts/deletegift/"+id;
    return this.http.delete<boolean>(url);

  }

}
