import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatagoryService {

  public catagory = new BehaviorSubject('Top');
  constructor() { }
}
