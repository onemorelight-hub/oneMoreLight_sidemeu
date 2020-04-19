import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {
  handleError(error: any): any {
    throw new Error("Method not implemented.");
  }

  constructor() { }
}
