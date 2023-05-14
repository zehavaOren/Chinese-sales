import { Buying } from "./buying.model";
import { Gift } from "./gift.model";

export class Buyer {
    public id: number = 0;
    public name: string = "";
    public email: string = "";
    public phone: string = "";
    public gifts: Buying[] = [];
}

