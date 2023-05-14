import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Donator } from '../models/donator';

@Injectable({
  providedIn: 'root'
})
export class DonatorService {


  donators: BehaviorSubject<Donator[]> = new BehaviorSubject([new Donator]);


  constructor(private http:HttpClient) { }

  public getAllDonators()  :Observable<Donator[]> {
    let url = "api/donator/getalldonators";
    return this.http.get<Donator[]>(url);
  }


  saveList(donators: Donator[]){
    this.donators.next(donators);
}


  public addDonator(donator:Donator) : Observable<boolean>{
    console.log(donator);
   let url="api/donator/adddonator";
    return this.http.post<boolean>(url,donator);
  }

  public updateDonator(donator:Donator):Observable<boolean>{
    let url="api/donator/updatedonator/";
    return this.http.put<boolean>(url,donator);
  }

  public deleteDonator (id: number) : Observable<boolean>{
    let url = "api/donator/deletedonator/"+id;
    return this.http.delete<boolean>(url);

  }


}
