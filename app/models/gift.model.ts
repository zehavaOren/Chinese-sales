import { Buyer } from "./buyer.model";

export class Gift{
    public name: string = '';
    public donator: string ='';
    public id:number  = 0;
    public price: number = 0;
    public buyers: Buyer[] =[];
    public winner: Buyer = new Buyer();
}