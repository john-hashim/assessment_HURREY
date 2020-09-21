import { Time } from '@angular/common';

export interface Batch{
    id?:string;
    name?:string;
    institution?:string;
    day?:string;
    starttime?:Time;
}